import logging
from ax_listener import AXFrame
from telemetry_listener import TelemetryFrame


class FileLogger():

    def __init__(self, logfile):
        self._logger = logging.getLogger(__name__)
        self.file_logger = logging.FileHandler(logfile)

    """ Log received package to a .log file"""

    def log_ax_frame(self, frame: AXFrame):
        self.file_logger.handle(self._logger.makeRecord(None, logging.DEBUG, None, None, str(frame), None, None))

    def log_telemetry(self, frame: TelemetryFrame):
        self.file_logger.handle(self._logger.makeRecord(None, logging.DEBUG, None, None, str(frame), None, None))