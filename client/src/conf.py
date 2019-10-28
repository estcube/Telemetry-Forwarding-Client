"""Provides a class for configuration parsing and modifying"""

import configparser

TNC_PROTOCOL_TYPE_TYPES = ["KISS", "AGW"]
TNC_CONNECTION_TYPE_TYPES = ["TCP/IP", "RS232"]

class Configuration(object):

    def __init__(self, path: str):
        self.config = configparser.RawConfigParser()
        self.configPath = path
        self.config.read(path)
        self.constraints = {}
        self.sections = self.config.sections()

        for i in self.config["Constraints"]:
            self.constraints[i] = self.config["Constraints"][i]

    def get_conf(self, section, element):
        """
        Retrieves the configured value at the specified field.

        example: getConf("Mission Control", "relay-enabled")
        """
        return self.config.get(section, element)

    def get_all_conf(self):
        conf = {}
        config = self.config
        for each_section in config.sections():
            section = {}
            for (each_key, each_val) in config.items(each_section):
                section[each_key] = each_val
            conf[each_section] = section

        return conf

    # example: setConf("Mission Control", "relay-enabled", False)
    def setConf(self, section, element, value):

        if(section not in self.sections):
            raise ValueError("Section", section, "does not exist")

        if(element not in self.constraints):
            raise ValueError("Element", element, "is not in config")

        if(element == "tnc-protocol-type" and value not in TNC_PROTOCOL_TYPE_TYPES):
            raise ValueError("TNC-Protocol-Type only supports ", TNC_PROTOCOL_TYPE_TYPES)

        if(element == "tnc-connection-type" and value not in TNC_CONNECTION_TYPE_TYPES):
            raise ValueError("TNC-Connection-Type only supports ", TNC_CONNECTION_TYPE_TYPES)

        if(type(value) is not eval(self.constraints.get(element))):
            raise ValueError("Wrong type for element: ", element)

        self.config.set(section, element, value)

        with open(self.configPath, 'w') as configfile:
            self.config.write(configfile)
