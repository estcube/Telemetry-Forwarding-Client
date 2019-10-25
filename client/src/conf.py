import configparser

TNC_Protocol_Type_types = ["KISS", "AGW"]
TNC_Connection_Type_types = ["TCP/IP", "RS232"]

class Configuration(object):

    def __init__(self, path: str):
        self.config = configparser.RawConfigParser()
        self.configPath = path
        self.config.read(path)
        self.constraints = {}
        self.sections = self.config.sections()

        for i in self.config["Constraints"]:
            self.constraints[i] = self.config["Constraints"][i]

    # example: getConf("Mission Control", "relay-enabled")
    def getConf(self, section, element):
        return self.config.get(section, element)

    def getAllConf(self):
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

        if(element == "tnc-protocol-type" and value not in TNC_Protocol_Type_types):
            raise ValueError("TNC-Protocol-Type only supports ", TNC_Protocol_Type_types)

        if(element == "tnc-connection-type" and value not in TNC_Connection_Type_types):
            raise ValueError("TNC-Connection-Type only supports ", TNC_Connection_Type_types)

        if(type(value) is not eval(self.constraints.get(element))):
            raise ValueError("Wrong type for element: ", element)

        self.config.set(section, element, value)

        with open(self.configPath, 'w') as configfile:
            self.config.write(configfile)
