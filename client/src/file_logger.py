import logging
from ax_listener import AXFrame
from telemetry_listener import TelemetryFrame
from conf import Configuration
import requests


class FileLogger():
    log = logging.getLogger(__name__)

    def __init__(self, config: Configuration, path, mission_name):
        self._logger = logging.getLogger(__name__)
        # Get Satellite catalog number from tle to be used as name for log file
        try:
            tle_req = requests.get(config.get_conf("Client", "tle-url"))
            if tle_req.status_code == 200:
                mission_name = tle_req.text.split("\n")[1][2:7]
        except:
            self.log.warning("Connection to tle endpoint failed")

        logfile = "{}{}_packets.log".format(path, mission_name)
        self.file_logger = logging.FileHandler(logfile)

    """ Log received package to a .log file"""

    def log_ax_frame(self, frame: AXFrame):
        log = "Timestamp: {}; DST: {}; SRC: {}; Control field: {}; Info field: {};".format(frame.recv_time, frame.dest,
                                                                                           frame.source, frame.ctrl,
                                                                                           frame.info.hex())
        self.file_logger.handle(self._logger.makeRecord(None, logging.DEBUG, None, None, log, None, None))
