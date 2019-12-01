"""Provides a class for configuration parsing and modifying"""

import configparser
import logging
from copy import deepcopy
from rw_lock import ReadWriteLock
import re

CONSTRAINTS = {
    "Mission Control": {
        "relay-enabled": {
            "type": "bool",
            "label": "Relay enabled"
        },
        "mcs-relay-url": {
            "type": "url",
            "label": "MCS relay URL"
        },

        "receiver-callsign": {
            "type": "str",
            "label": "Receiver callsign",
            "max_len": 6
        },
        "norad-id": {
            "type": "int",
            "label": "Satellite Norad ID",
            "min": 1,
            "max": 99999
        },
        "longitude": {
            "type": "float",
            "label": "Receiver longitude",
            "min": -180,
            "max": 180
        },
        "latitude": {
            "type": "float",
            "label": "Receiver latitude",
            "min": -180,
            "max": 180
        }
    },

    "TNC interface": {
        "tnc-protocol-type": {
            "type": "select",
            "requiresRestart": True,
            "options": ["KISS"],
            "disabledOptions": ["AGW"],
            "label": "TNC protocol type"
        },
        "tnc-connection-type": {
            "type": "select",
            "requiresRestart": True,
            "options": ["TCP/IP"],
            "disabledOptions": ["RS232"],
            "label": "TNC connection type"
        },
        "tnc-ip": {
            "type": "str",
            "requiresRestart": True,
            "label": "TNC IP"
        },
        "tnc-device": {
            "type": "str",
            "requiresRestart": True,
            "label": "TNC device"
        },
        "max-connection-attempts": {
            "type": "int",
            "requiresRestart": True,
            "label": "Max connection attempts",
            "hidden": True,
            "min": 1,
            "max": 10000
        },
        "connection-retry-time": {
            "type": "int",
            "requiresRestart": True,
            "label": "Connection retry time",
            "hidden": True,
            "min": 1,
            "max": 600
        }
    },

    "Client": {
        "database": {
            "type": "str",
            "description": "Path to the database file. Relative to executable file.",
            "requiresRestart": True,
            "label": "Database path",
            "hidden": True
        },
        "static-files-path": {
            "type": "str",
            "description": "Path to the root directory of static frontend files",
            "debug": True,
            "requiresRestart": True,
            "label": "Static files path",
            "hidden": True
        },
        "frontend-port": {
            "type": "int",
            "description": "Port that the frontend and api are served on.",
            "requiresRestart": True,
            "label": "Frontend port",
            "min": 1024,
            "max": 65535
        },
        "telemetry-configuration-url": {
            "type": "url",
            "description": "URL of the latest telemetry configuration endpoint.",
            "requireRestart": False,
            "label": "Telemetry configuration URL"
        },
        "kaitai-compiler-path": {
            "type": "str",
            "description": "Path to the kaitai-struct-compiler executable. Relative to client executables.",
            "requireRestart": False,
            "hidden": True
        },
        "packet-structure-url": {
            "type": "url",
            "description": "URL of the latest packet structure (kaitai) endpoint.",
            "label": "Packet structure URL"
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
            return self.config.get(section, element)

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
                for (each_key, each_val) in config.items(each_section):
                    section[each_key] = each_val
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
            elif constr["type"] == "url":
                regex = '^https?:\/\/(www\.)?([0-9a-zA-Z]+\.)+[a-z]+(:\d+)?(\/\S+)*$'
                is_valid = re.match(regex, value)
                if not is_valid:
                    raise ValueError("Expected {} as {} value (got '{}')".format("URL", element, value))
            elif constr["type"] == "int":
                try:
                    if not isinstance(value, int):
                        value = int(value)
                except Exception as e:
                    raise type(e)("Expected {} as {} value (got '{}')".format("integer", element, value))
            elif constr["type"] == "float":
                try:
                    if not isinstance(value, float):
                        value = float(value)
                except Exception as e:
                    raise type(e)("Expected {} as {} value (got '{}')".format("float", element, value))
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

            for i in constraints:
                for j in constraints[i]:
                    val = None
                    if i in config and j in config[i]:
                        val = (config[i][j])
                    constraints[i][j].update({"value": val})

            return constraints
