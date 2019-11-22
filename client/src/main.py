"""Main entrypoint file for the Telemetry decoder."""

import os
import logging
import time
import sys
import signal
from getopt import getopt
from threading import Thread
import kiss
from ax_listener import AXListener, AXFrame
from conf import Configuration
from db_interface import TelemetryDB
from telemetry_listener import TelemetryListener
from sids_relay import SIDSRelay
import api


def print_frame(frame: AXFrame):
    """ Debug function that just prints the AXFrame object emitted by the AXListener. """
    print(frame)

def runApi(conf, static_path, port):
    app = api.create_app(conf, static_path)
    app.run(port=port)

def terminate_handler(_signo, _stack_frame):
    sys.exit(0)

def main(argv):
    """ Main loop function. """

    # Initial logging configuration.
    logging.basicConfig(level=logging.DEBUG)
    _logger = logging.getLogger(__name__)

    # Parse command line options
    opts, args = getopt(argv, "vc:")
    conf_path = None
    # verbose = False
    for opt, arg in opts:
        if opt == "-c":
            conf_path = arg
        # if opt == "-v":
        #     verbose = True

    if conf_path is None: # Default conf path
        conf_path = os.path.join(os.path.dirname(__file__), "..", "configuration.ini")
    _logger.info("Using configuration from: %s", conf_path)

    # Create the configuration object
    conf = Configuration(conf_path)

    # Create the database object
    db_loc = os.path.join(os.path.dirname(__file__), conf.get_conf("Client", "database"))
    database = TelemetryDB(db_loc)
    database.init_db()

    # Read the json configuration of telemetry fields.
    f = open(os.path.join(os.path.dirname(__file__), "..", "spec", "telemetry.json"), "r",
            encoding="utf-8")
    telemetry_conf = f.read()
    f.close()

    # Build the other components.
    ax_listener = AXListener()
    sids_relay = SIDSRelay(conf)
    telemetry_listener = TelemetryListener(telemetry_conf, database)

    # Create the flask app and start it in a forked process.
    port = None
    try:
        port = int(conf.get_conf("Client", "frontend-port"))
    except ValueError:
        port = 5000 # Default port.

    api_app = api.create_app(conf, conf.get_conf("Client", "static-files-path"))
    # We set the daemon option to True, so that the client will quit once the other threads have
    #  finished because we don't have a good way of stopping the Flask app properly.
    api_thread = Thread(target=api_app.run, kwargs={"port": port}, daemon=True)
    api_thread.start()

    # Set the handler for SIGTERM, so we can exit a bit more gracefully.
    signal.signal(signal.SIGTERM, terminate_handler)

    # Hook the callbacks to the ax_listener.
    # ax_listener.add_callback(print_frame)
    ax_listener.add_callback(database.insert_ax_frame)
    ax_listener.add_callback(sids_relay.relay)
    ax_listener.add_callback(telemetry_listener.receive)

    k = kiss.TCPKISS(
        conf.get_conf("TNC interface", "tnc-ip"),
        conf.get_conf("TNC interface", "tnc-port"), strip_df_start=True
    )

    try:
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
                    api_thread.join()

        k.read(callback=ax_listener.receive)
    finally:
        k.stop()

if __name__ == "__main__":
    main(sys.argv[1:])
