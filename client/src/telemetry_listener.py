import sys
import os
import logging
import json
from datetime import datetime
from enum import Enum
from ax_listener import AXFrame
from db_interface import TelemetryDB
from client.kaitai.main_kaitai import *
import util

if getattr(sys, 'frozen', False):
    sys.path.append(os.path.join(util.get_root(), 'src'))


class TelemetryFrame():
    """ Data structure for the output of the telemetry listener that is sent to the repository. """

    def __init__(self, packet_timestamp: datetime, fields):
        self.timestamp = packet_timestamp
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
        Main function that receives an AXFrame and processes its data.

        After processing, calls the database repository function to add the data to the database.
        """

        icp = None
        try:
            icp = Main.from_bytes(ax_frame.info)
        except ValueError as error:
            self._logger.debug(error)
            self._logger.info("Failed to parse payload.")
            return

        self._logger.debug("ICP Packet received (cmd: %s, mode: %s)", icp.cmd, icp.mode)
        self._logger.debug("Payload: %s", icp.common_data)


        common = icp.common_data
        spec = icp.spec_data
        fields = []
        for elem in vars(icp):
            if not elem.startswith("_") and not elem.startswith("co") and not elem.startswith("sp") and not elem.startswith("cr"):
                print(elem, getattr(icp, elem))
                fields.append((elem, getattr(icp, elem)))
        print(" ")
        for elem in vars(common):
            if not elem.startswith("_"):
                print(elem, getattr(common, elem))
                fields.append((elem, getattr(common, elem)))
        print(" ")
        for elem in vars(spec):
            if not elem.startswith("_"):
                print(elem, getattr(spec, elem))
                fields.append((elem, getattr(spec, elem)))
        print("")

        print("crc", getattr(icp, "crc"))
        fields.append(("crc", getattr(icp, "crc")))

        tmp = dict(fields)
        tmp.pop("uuid")
        fields_json = json.dumps(tmp)

        self.database.add_telemetry_frame(TelemetryFrame(common.unix_time, fields_json))

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
