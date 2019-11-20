
import logging
import json
from datetime import datetime
from enum import Enum
from ax_listener import AXFrame
from db_interface import TelemetryDB
from icp import Icp

class TelemetryFrame():
    def __init__(self, packet_timestamp: datetime, recv_timestamp: datetime, fields):
        self.timestamp = packet_timestamp
        self.recv_timestamp = recv_timestamp
        self.fields = fields

class TimestampType(Enum):
    unix = 'unix_timestamp'

class TelemetryListener():

    _logger = logging.getLogger(__name__)

    def __init__(self, conf: str, db: TelemetryDB):
        self.db = db
        self.conf = json.loads(conf)
        if "prefix" not in self.conf:
            raise ValueError("The configuration does not include the 'prefix' field")
        if "fields" not in self.conf:
            raise ValueError("The configuration does not include the 'fields' field")
        self.prefix = self.conf["prefix"].split(".")

        self.msg_ts_id: str = None
        self.msg_ts_type: TimestampType = None
        for field in self.conf["fields"]:
            if "isMsgTimestamp" in field and field["isMsgTimestamp"] == True:
                self.msg_ts_id = field["id"]
                try:
                    self.msg_ts_type = TimestampType(field["type"])
                except ValueError:
                    raise ValueError("The type of the message timestamp is unknown.")


        if self.msg_ts_id is None or self.msg_ts_type is None:
            raise ValueError("The id of the message timestamp field is not defined.")

    def receive(self, ax: AXFrame):
        icp = Icp.from_bytes(ax.info)

        self._logger.debug("ICP Packet received (cmd: %s, mode: %s)", icp.cmd, icp.data.mode)
        self._logger.debug("Payload: %s", icp.data.payload)

        obj = icp
        for prefix_part in self.prefix:
            self._logger.debug("prefix_part: %s, obj: %s", prefix_part, obj)
            if prefix_part not in dir(obj):
                self._logger.debug("Didn't find the prefix part '%s'.", prefix_part)
                return
            obj = getattr(obj, prefix_part)

        fields = []
        timestamp = self.extractFields(obj, [], fields, self.msg_ts_id)
        if timestamp == None:
            self._logger.debug("Didn't find the configured msg timestamp from the fields")

        ts_datetime = None

        if self.msg_ts_type == TimestampType.unix:
            ts_datetime = datetime.fromtimestamp(timestamp)

        self.db.add_telemetry_frame(TelemetryFrame(ts_datetime, ax.recv_time, fields))

        # TODO: CRC control

    def extractFields(self, obj, name_stack, fields, msg_ts_id):
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
                timestamp = timestamp or self.extractFields(value, name_stack + [name], fields, msg_ts_id)
        return timestamp
