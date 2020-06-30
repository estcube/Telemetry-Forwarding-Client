"""Provides a class for configuration parsing and modifying"""

import re
import configparser
import logging
from copy import deepcopy
from rw_lock import ReadWriteLock

CONSTRAINTS = {
    "Mission Control": {
        "relay-enabled": {
            "type": "bool",
            "label": "Relay enabled",
            "value": "False"
        },
        "mcs-relay-url": {
            "type": "str",
            "label": "MCS relay URL",
            "value": "http://staging.estcube.eu:8029/ax25",
            "regexType": "url"
        },
        "relay-request-type": {
            "type": "select",
            "options": ["GET", "POST"],
            "label": "Relay request type",
            "value": "GET"
        },

        "receiver-callsign": {
            "type": "str",
            "label": "Receiver callsign",
            "max_len": 6,
            "value": "String"
        },
        "norad-id": {
            "type": "int",
            "label": "Satellite Norad ID",
            "min": 1,
            "max": 99999,
            "value": "43792"
        },
        "longitude": {
            "type": "float",
            "label": "Receiver longitude",
            "min": -180,
            "max": 180,
            "value": "58.377974"
        },
        "latitude": {
            "type": "float",
            "label": "Receiver latitude",
            "min": -180,
            "max": 180,
            "value": "26.729019"
        }
    },

    "TNC interface": {
        "tnc-protocol-type": {
            "type": "select",
            "requiresRestart": True,
            "options": ["KISS"],
            "disabledOptions": ["AGW"],
            "label": "TNC protocol type",
            "value": "kiss"
        },
        "tnc-connection-type": {
            "type": "select",
            "requiresRestart": True,
            "options": ["TCP/IP"],
            "disabledOptions": ["RS232"],
            "label": "TNC connection type",
            "value": "TCP/IP"
        },
        "tnc-ip": {
            "type": "str",
            "requiresRestart": True,
            "label": "TNC IP",
            "value": "localhost",
            "regexType": "ip"
        },
        # "tnc-device": {
        #     "type": "str",
        #     "requiresRestart": True,
        #     "label": "TNC device",
        #     "value": " "
        # },
        "max-connection-attempts": {
            "type": "int",
            "requiresRestart": True,
            "label": "Max connection attempts",
            "hidden": False,
            "min": 1,
            "max": 10000,
            "value": "20"
        },
        "connection-retry-time": {
            "type": "int",
            "requiresRestart": True,
            "label": "Connection retry time",
            "hidden": False,
            "min": 1,
            "max": 600,
            "value": "5"
        },
        "satellite-src": {
            "type": "str",
            "label": "AX.25 frame SRC",
            "value": "ESTCUB",
            "max_len": 6
        }
    },

    "Client": {
        "database": {
            "type": "str",
            "description": "Path to the database file. Relative to executable file.",
            "requiresRestart": True,
            "label": "Database path",
            "hidden": True,
            "value": "../telemetry.db"
        },
        "static-files-path": {
            "type": "str",
            "description": "Path to the root directory of static frontend files",
            "debug": True,
            "requiresRestart": True,
            "label": "Static files path",
            "hidden": True,
            "value": "../static"
        },
        "frontend-port": {
            "type": "int",
            "description": "Port that the frontend and api are served on.",
            "requiresRestart": True,
            "label": "Frontend port",
            "min": 1024,
            "max": 65535,
            "value": "5000"
        },
        "telemetry-configuration-url": {
            "type": "str",
            "regexType": "url",
            "description": "URL of the latest telemetry configuration endpoint.",
            "label": "Telemetry configuration URL",
            "value": "http://staging.estcube.eu:8029/icp/telemetry"
        },
        "kaitai-compiler-path": {
            "type": "str",
            "description": "Path to the kaitai-struct-compiler executable. Relative to client executables.",
            "requireRestart": False,
            "hidden": True,
            "value": "../../kaitai/bin/kaitai-struct-compiler"
        },
        "packet-structure-url": {
            "type": "str",
            "regexType": "url",
            "description": "URL of the latest packet structure (kaitai) endpoint.",
            "label": "Packet structure URL",
            "value": "http://staging.estcube.eu:8029/icp/config"
        },
        "debug-log": {
            "type": "bool",
            "label": "Debug logging",
            "value": False,
            "description": "Turn on debug level logging"
        }
    }
}


class Configuration(object):
    """ Class for parsing and modifying the configuration. """

    _log = logging.getLogger(__name__)

    def __init__(self, path: str):
        self.config = configparser.RawConfigParser()
        self.config_path = path
        self.config.read(path)
        self.constraints = {}
        self.sections = self.config.sections()

        self.lock = ReadWriteLock()

    def get_conf(self, section, element):
        """
        Retrieves the configured value at the specified field.

        example: getConf("Mission Control", "relay-enabled")
        """
        with self.lock.read_lock:
            conf_value = None
            try:
                conf_value = self.config.get(section, element)
            except (configparser.NoSectionError, configparser.NoOptionError):
                if section in CONSTRAINTS:
                    sec = CONSTRAINTS[section]
                    if element in sec and "value" in sec[element]:
                        conf_value = sec[element]["value"]
            return conf_value

    def get_constraints(self):
        """ Returns all of the constraints for the configuration. """
        return CONSTRAINTS

    def get_all_conf(self):
        """
        Returns the whole configuration as a dictionary, where each section is mapped to its own
        dictionary or fields.
        """
        with self.lock.read_lock:
            conf = {}
            config = self.config
            for each_section in config.sections():
                section = {}
                section_const = CONSTRAINTS[each_section]
                for (each_key, each_val) in config.items(each_section):
                    section[each_key] = each_val
                for (const_key, const_obj) in section_const.items():
                    if const_key not in section and "value" in const_obj:
                        section[const_key] = const_obj["value"]
                conf[each_section] = section

            return conf

    # example: setConf("Mission Control", "relay-enabled", False)
    def set_conf(self, section, element, value):
        """
        Sets the configuration value at the given position to the given value.

        Controls that the value is of a correct type, and for certain values, checks if it is in
        the permitted value list.
        After setting the value, also overwrites the configuration file with the current
        configuration state after the change.
        """
        with self.lock.write_lock:
            if section not in CONSTRAINTS:
                raise ValueError("Section {} does not exist.".format(section))

            section_constraints = CONSTRAINTS[section]
            if element not in section_constraints:
                raise ValueError("Field {} - {} does not exist.".format(section, element))

            constr = section_constraints[element]
            if 'hidden' in constr and constr["hidden"] == True:
                return
            if constr["type"] == "str":
                pass
            if "regexType" in constr:
                if constr["regexType"] == "url":
                    regex = '^https?://(www.)?([0-9a-zA-Z]+.)+([a-z]+|[0-9]+)(:\d+)?(/\S+)*$'
                    is_valid = re.match(regex, value)
                    if not is_valid:
                        raise ValueError("Expected {} as {} value (got '{}')".format("URL", element, value))
                elif constr["regexType"] == "ip":
                    regex = '(^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$|^(localhost)$'
                    is_valid = re.match(regex, value)
                    if not is_valid:
                        raise ValueError("Expected {} as {} value (got '{}')".format("ip", element, value))
            elif constr["type"] == "int":
                try:
                    if not isinstance(value, int):
                        value = int(value)
                except Exception as e:
                    raise type(e)("Expected {} as {} value (got '{}')".format("integer", element, value))
                if not (int(constr["min"]) <= value <= int(constr["max"])):
                    raise Exception("Value {} is out of range (expected value between {} and {}, got {})".format(element, constr["min"], constr["max"], value))

            elif constr["type"] == "float":
                try:
                    if not isinstance(value, float):
                        value = float(value)
                except Exception as e:
                    raise type(e)("Expected {} as {} value (got '{}')".format("float", element, value))
                if not (float(constr["min"]) <= value <= float(constr["max"])):
                    raise Exception("Value {} is out of range (expected value between {} and {}, got {})".format(element, constr["min"], constr["max"], value))
            elif constr["type"] == "bool":
                if not isinstance(value, bool):
                    if value.lower() == "true":
                        value = True
                    elif value.lower() == "false":
                        value = False
                    else:
                        raise ValueError("Expected {} as {} value (got '{}')".format("True or False", element,
                                                                                            value))
            elif constr["type"] == "select":
                if value not in constr["options"]:
                    raise ValueError("{} - {} only supports values: {}".format(
                        section, element, constr["options"]))

            self.config.set(section, element, value)

            with open(self.config_path, 'w') as configfile:
                self.config.write(configfile)

    def get_conf_with_constraints(self):
        """
        Goes through the constraints and the values and returns a dictionary with constraints that have the value appended.
        """
        with self.lock.read_lock:
            constraints = deepcopy(CONSTRAINTS)
            config = self.get_all_conf()

            for i in config:
                for j in config[i]:
                    try:
                        constraints[i][j]["value"] = config[i][j]
                    except:
                        pass

            return constraints
