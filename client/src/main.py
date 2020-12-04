"""Main entrypoint file for the Telemetry decoder."""

import os
import logging
import sys
import signal
import platform
from getopt import getopt
from threading import Thread
import util
from ax_listener import AXListener, AXFrame
from conf import Configuration
from db_interface import TelemetryDB
from telemetry_listener import TelemetryListener
from sids_relay import SIDSRelay
from tnc_pool import TNCPool
from file_logger import FileLogger
from updater import Updater
import api
from pkg_resources import parse_version
from kaitaistruct import __version__ as ks_version, KaitaiStruct, KaitaiStream, BytesIO
from enum import Enum


def print_frame(frame: AXFrame):
    """ Debug function that just prints the AXFrame object emitted by the AXListener. """
    print(frame)


def terminate_handler(_signo, _stack_frame):
    """
    Attempt to exit more cleanly on receiving a SIGTERM signal.
    Raises a SystemExit exception, upon receiving SIGTERM. Registered in the main function.
    """
    sys.exit(0)


def main(argv):
    """ Main loop function. """

    """ Parse command line options """
    opts, args = getopt(argv, "vc:")
    conf_path = None

    for opt, arg in opts:
        if opt == "-c":
            conf_path = arg

    if conf_path is None:
        """ Default conf path """
        conf_path = os.path.join(util.get_root(), "configuration.ini")

    """ Create the configuration object """
    conf = Configuration(conf_path)

    """ Set up logging """
    if not conf.get_conf("Client", "debug-log"):
        logging.basicConfig(level=logging.INFO)
    else:
        logging.basicConfig(level=logging.DEBUG)
    _logger = logging.getLogger(__name__)

    if not os.path.isdir("../logs"):
        os.mkdir("../logs")

    formatter = logging.Formatter('%(name)-12s: %(levelname)-8s %(message)s')
    handler = logging.FileHandler("../logs/system_logs.log")
    handler.setFormatter(formatter)

    logging.getLogger('').addHandler(handler)

    _logger.info("Using configuration from: %s", conf_path)

    """ Create the database object """
    db_loc = os.path.join(util.get_root(), conf.get_conf("Client", "database"))
    database = TelemetryDB(db_loc)
    database.init_db()

    """ Update grafana and kaitai configurations """
    if conf.get_conf("Client", "automatic-updating"):
        Updater(conf).checkForUpdates()

    """ Build the other components. """
    ax_listener = AXListener(conf)
    sids_relay = SIDSRelay(conf, database)
    telemetry_listener = TelemetryListener(database)
    file_logger = FileLogger(conf, conf.get_conf("Client", "logs"), "log")

    """ Create the flask app and start it in a forked process. """
    port = conf.get_conf("Client", "frontend-port")

    """ Set the handler for SIGTERM, so we can exit a bit more gracefully. """
    signal.signal(signal.SIGTERM, terminate_handler)

    """ Hook the callbacks to the ax_listener. """
    ax_listener.add_callback(database.insert_ax_frame)
    ax_listener.add_callback(sids_relay.relay)
    ax_listener.add_callback(file_logger.log_ax_frame)
    ax_listener.add_callback(telemetry_listener.receive)

    tnc_pool = TNCPool(conf, ax_listener)
    tnc_pool.connect_main_tnc()

    api_app = api.create_app(conf, tnc_pool, sids_relay)
    """ We set the daemon option to True, so that the client will quit once the other threads have
        finished because we don't have a good way of stopping the Flask app properly. """
    api_thread = Thread(target=api_app.run, kwargs={"port": port}, daemon=True)
    api_thread.start()

    try:
        """ On windows, the KeyboardInterrupt doesn't break the join. """
        if platform.system() == "Windows":
            while api_thread.isAlive:
                api_thread.join(2)
        else:
            api_thread.join()
    except (KeyboardInterrupt, SystemExit):
        pass
    finally:
        tnc_pool.cleanup()


if __name__ == "__main__":
    main(sys.argv[1:])
