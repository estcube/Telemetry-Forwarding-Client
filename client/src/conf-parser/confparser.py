import configparser


config = configparser.RawConfigParser()
config.read('../configuration.ini')

TNC_Protocol_Type_types = ["KISS", "AGW"]
TNC_Connection_Type_types = ["TCP/IP", "RS232"]

constraints = {}
sections = config.sections()

for i in config["Constraints"]:
    constraints[i] = config["Constraints"][i]

# example: getConf("Mission Control", "relay-enabled")
def getConf(section, element):
    return config.get(section, element)

# example: setConf("Mission Control", "relay-enabled", False)
def setConf(section, element, value):
    
    if(section not in sections):
        raise ValueError("Section", sections, "does not exist")
    
    if(element not in constraints):
        raise ValueError("Element", element, "is not in config")

    if(element == "tnc-protocol-type" and value not in TNC_Protocol_Type_types):
        raise ValueError("TNC-Protocol-Type only supports ", TNC_Protocol_Type_types)
    
    if(element == "tnc-connection-type" and value not in TNC_Connection_Type_types):
        raise ValueError("TNC-Connection-Type only supports ", TNC_Connection_Type_types)
    
    if(type(value) is not eval(constraints.get(element))):
        raise ValueError("Wrong type for element: ", element)
    
    config.set(section, element, value)
    
    with open('configuration.ini', 'w') as configfile:
        config.write(configfile)