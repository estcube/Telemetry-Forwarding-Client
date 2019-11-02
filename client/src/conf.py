"""Provides a class for configuration parsing and modifying"""

import configparser

CONSTRAINTS = {
    "Mission Control": {
        "relay-enabled": "bool",
        "mcs-relay-url": "str",
        "receiver-callsign": "str",
        "norad-id": "int"
    },

    "TNC interface": {
        "tnc-protocol-type": ["KISS", "AGW"],
        "tnc-connection-type": ["TCP/IP", "RS232"],
        "tnc-ip": "str",
        "tnc-device": "str",
        "max-connection-attempts": "int",
        "connection-retry-time": "int"
    },

    "Client": {
        "database": "str"
    }
}

class Configuration(object):
    """
    Class for parsing and modifying the configuration.
    """

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
            raise ValueError("Field {} does not exist.".format(element))

        constr = section_constraints[element]
        if constr is list:
            if value not in constr:
                raise ValueError(
                    "{} - {} only supports values: {}".format(section, element, constr)
                )
        else:
            if not isinstance(value, eval(constr)):
                raise ValueError("Wrong type for element {} - {}".format(section, element))

        self.config.set(section, element, value)

        with open(self.config_path, 'w') as configfile:
            self.config.write(configfile)
