"""Provides a class for configuration parsing and modifying"""

import configparser

CONSTRAINTS = {
    "Mission Control": {
        "relay-enabled": {
            "type": "bool"
        },
        "mcs-relay-url": {
            "type": "str"
        },

        "receiver-callsign": {
            "type": "str"
        },
        "norad-id": {
            "type": "int"
        },
        "longitude": {
            "type": "int"
        },
        "latitude": {
            "type": "int"
        }
    },

    "TNC interface": {
        "tnc-protocol-type": {
            "type": "select",
            "requiresRestart": True,
            "options": ["KISS"],
            "disabledOptions": ["AGW"]
        },
        "tnc-connection-type": {
            "type": "select",
            "requiresRestart": True,
            "options": ["TCP/IP", "RS232"]
        },
        "tnc-ip": {
            "type": "str",
            "requiresRestart": True
        },
        "tnc-device": {
            "type": "str",
            "requiresRestart": True
        },
        "max-connection-attempts": {
            "type": "str",
            "requiresRestart": True
        },
        "connection-retry-time": {
            "type": "str",
            "requiresRestart": True
        }
    },

    "Client": {
        "database": {
            "type": "str",
            "description": "Path to the database file. Relative to executable file.",
            "requiresRestart": True
        },
        "static-files-path": {
            "type": "str",
            "description": "Path to the root directory of static frontend files",
            "debug": True,
            "requiresRestart": True
        },
        "frontend-port": {
            "type": "int",
            "description": "Port that the frontend and api are served on.",
            "requiresRestart": True
        }
    }
}


class Configuration(object):
    """ Class for parsing and modifying the configuration. """

    def __init__(self, path: str):
        self.config = configparser.RawConfigParser()
        self.config_path = path
        self.config.read(path)
        self.constraints = {}
        self.sections = self.config.sections()

    def get_conf(self, section, element):
        """
        Retrieves the configured value at the specified field.

        example: getConf("Mission Control", "relay-enabled")
        """
        return self.config.get(section, element)

    def get_constraints(self):
        """ Returns all of the constraints for the configuration. """
        return CONSTRAINTS

    def get_all_conf(self):
        """
        Returns the whole configuration as a dictionary, where each section is mapped to its own
        dictionary or fields.
        """
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

        if section not in CONSTRAINTS:
            raise ValueError("Section {} does not exist.".format(section))

        section_constraints = CONSTRAINTS[section]
        if element not in section_constraints:
            raise ValueError("Field {} - {} does not exist.".format(section, element))

        constr = section_constraints[element]
        if constr["type"] == "str":
            pass
        elif constr["type"] == "int":
            if not isinstance(value, int):
                value = int(value)
        elif constr["type"] == "bool":
            if not isinstance(value, bool):
                if value.lower() == "true":
                    value = True
                elif value.lower() == "false":
                    value = False
                else:
                    raise ValueError("Expected a boolean value or string 'True' or 'False'.")
        elif constr["type"] == "select":
            if value not in constr["options"]:
                raise ValueError(
                    "{} - {} only supports values: {}".format(section, element, constr["options"])
                )

        self.config.set(section, element, value)

        with open(self.config_path, 'w') as configfile:
            self.config.write(configfile)

    def get_conf_with_constraints(self):
        """
        Goes through the constraints and the values and returns a dictionary with constraints that have the value appended.
        """
        constraints = self.get_constraints()
        config = self.get_all_conf()

        for i in constraints:
            for j in constraints[i]:
                val = (config[i][j])
                if val == "":
                    val = "null"
                constraints[i][j].update({"value": val})

        return constraints
