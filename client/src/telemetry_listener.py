
import sys
import os
import logging
import json
from datetime import datetime
from enum import Enum
from ax_listener import AXFrame
from db_interface import TelemetryDB
import util
if getattr(sys, 'frozen', False):
    sys.path.append(os.path.join(util.get_root(), 'src'))
from icp import Icp

class TelemetryFrame():
    """ Data structure for the output of the telemetry listener that is sent to the repository. """

    def __init__(self, packet_timestamp: datetime, recv_timestamp: datetime, fields):
        self.timestamp = packet_timestamp
        self.recv_timestamp = recv_timestamp
        self.fields = fields

class TimestampType(Enum):
    """ Enum of the supported timestamp types. """
    unix = 'unix_timestamp'

class TelemetryListener():
    """
    The listener class for telemetry.

    Uses a json configuration file and the compiled kaitai structure to parse the telemetry data
    from an arbitrary input byte array.

    For more information read the specification at: /doc/data_conf_spec.md
    """

    _logger = logging.getLogger(__name__)

    def __init__(self, conf: str, db: TelemetryDB):
        self.database = db
        self.conf = json.loads(conf)
        if "prefix" not in self.conf:
            raise ValueError("The telemetry configuration does not include the 'prefix' field")
        if "fields" not in self.conf:
            raise ValueError("The telemetry configuration does not include the 'fields' field")
        if "msgTimestamp" not in self.conf:
            raise ValueError(
                    "The telemetry configuration does not include the 'msgTimestamp' field")

        self.prefix = self.conf["prefix"].split(".")

        self.msg_ts_id = self.conf["msgTimestamp"]["id"]
        try:
            self.msg_ts_type = TimestampType(self.conf["msgTimestamp"]["type"])
        except ValueError:
            raise ValueError("The type of the message timestamp is unknown.")

    def receive(self, ax_frame: AXFrame):
        """
        Main function that receives an AXFrame and processes its payload.

        After processing, calls the database repository function to add the data to the database.
        """

        icp = None
        try:
            icp = Icp.from_bytes(ax_frame.info)
        except ValueError as error:
            self._logger.debug(error)
            self._logger.info("Failed to parse payload.")
            return

        self._logger.debug("ICP Packet received (cmd: %s, mode: %s)", icp.cmd, icp.data.mode)
        self._logger.debug("Payload: %s", icp.data.payload)

        obj = icp
        for prefix_part in self.prefix:
            # self._logger.debug("prefix_part: %s, obj: %s", prefix_part, obj)
            if prefix_part not in dir(obj):
                self._logger.debug("Didn't find the prefix part '%s'.", prefix_part)
                return
            obj = getattr(obj, prefix_part)

        fields = []
        timestamp = self.extract_fields(obj, [], fields, self.msg_ts_id)
        if timestamp is None:
            self._logger.debug("Didn't find the configured msg timestamp from the fields")

        ts_datetime = None

        if self.msg_ts_type == TimestampType.unix:
            ts_datetime = datetime.fromtimestamp(timestamp)

        # TODO: CRC control

        self.database.add_telemetry_frame(TelemetryFrame(ts_datetime, ax_frame.recv_time, fields))


    def extract_fields(self, obj, name_stack, fields, msg_ts_id):
        """
        Extracts all the fields from an arbitrary (possibly nested) struct object into an array.

        Uses dot as a delimeter when joining the field names.
        """

        timestamp = None
        for name in dir(obj):
            if name[:1] == "_":
                continue
            value = getattr(obj, name)
            if isinstance(value, str) or isinstance(value, int) or isinstance(value, bool):
                if ".".join(name_stack + [name]) == msg_ts_id:
                    timestamp = value
                fields.append((".".join(name_stack + [name]), value))
            else:
                timestamp = timestamp or self.extract_fields(
                    value, name_stack + [name], fields, msg_ts_id)
        return timestamp
