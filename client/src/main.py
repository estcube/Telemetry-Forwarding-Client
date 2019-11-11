"""Main entrypoint file for the Telemetry decoder."""

import os
import logging
import time
import sys
from getopt import getopt
from multiprocessing import Process
import kiss
from ax_listener import AXListener, AXFrame
from conf import Configuration
from db_interface import TelemetryDB
from sids_relay import SIDSRelay
import api


def print_frame(frame: AXFrame):
    """ Debug function that just prints the AXFrame object emitted by the AXListener. """
    print(frame)


def main(argv):
    """ Main loop function. """

    logging.basicConfig(level=logging.DEBUG)
    _logger = logging.getLogger(__name__)

    opts, args = getopt(argv, "vc:")

    # Read in the client configuration.
    conf_path = None
    verbose = False
    for opt, arg in opts:
        if opt == "-c":
            conf_path = arg
        if opt == "-v":
            verbose = True


    if conf_path == None:
        conf_path = os.path.join(os.path.dirname(__file__), "..", "configuration.ini")
    _logger.info("Configuration path: %s", conf_path)

    conf = Configuration(conf_path)

    # Build the components.
    ax_listener = AXListener()
    sids_relay = SIDSRelay(conf)

    db_loc = os.path.join(os.path.dirname(__file__), conf.get_conf("Client", "database"))
    database = TelemetryDB(db_loc)
    database.init_db()

    # Create the flask app and start it in a forked process.
    app = api.create_app(conf, conf.get_conf("Client", "static-files-path"))
    port = None
    try:
        port = int(conf.get_conf("Client", "frontend-port"))
    except ValueError:
        port = 5000 # Default port.
    api_proc = Process(name="Telemetry client API", target=app.run, kwargs={"port": port})
    api_proc.start()
    if verbose:
        _logger.debug("API Process is: %s", api_proc.pid)
        f = open(os.path.join(os.path.dirname(__file__), "__test__", "api.pid"), 'w', encoding="utf-8")
        f.write(str(api_proc.pid))
        f.close()

    try:
        # Hook the callbacks to the ax_listener.
        # ax_listener.add_callback(print_frame)
        ax_listener.add_callback(database.insert_ax_frame)
        ax_listener.add_callback(sids_relay.relay)

        k = kiss.TCPKISS(
            conf.get_conf("TNC interface", "tnc-ip"),
            conf.get_conf("TNC interface", "tnc-port"), strip_df_start=True
        )

        # Open the connection to the TNC.
        conn_tries = 0
        max_conn_tries = int(conf.get_conf("TNC interface", "max-connection-attempts"))
        retry_time = int(conf.get_conf("TNC interface", "connection-retry-time"))
        while True:
            try:
                k.start()
                break
            except ConnectionRefusedError:
                _logger.error(
                    "Could not initialize a TCP connection to %s:%s",
                    conf.get_conf("TNC interface", "tnc-ip"),
                    conf.get_conf("TNC interface", "tnc-port")
                    )
                if conn_tries < max_conn_tries:
                    conn_tries = conn_tries + 1
                    _logger.info("Retrying TNC connection in %d seconds...", retry_time)
                    time.sleep(retry_time)
                else:
                    _logger.error("Maximum TNC connection retries reached.")
                    api_proc.join()


        try:
            k.read(callback=ax_listener.receive)
        except KeyboardInterrupt:
            pass
        k.stop()
    finally:
        api_proc.terminate()
        api_proc.join()

if __name__ == "__main__":
    main(sys.argv[1:])
