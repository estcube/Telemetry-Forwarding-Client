# ESTCube-2 Telemetry Forwarding Client

The ESTCube-2 telemetry forwarding client (_decoder and relay_) is open-source software.

This is a cross-platform console application linking [TNC](https://en.wikipedia.org/wiki/Terminal_node_controller) hardware and enabling radio amateurs from around the world to downlink telemetry data while also decoding and visualising them locally on a dashboard.

When allowed, it relays the received packets to ESTCube Mission Control in Tartu, Estonia.
You may change the relay URL to a server of your choosing in the configuration (_configuration.ini_) - [sample](client/configuration.ini.sample).

This allows the ESTCube team to receive telemetry data, even when the satellite isn't accessible over Estonia.
This is vital, as the fly-over times of the satellite are relatively brief.

You can find the latest release from our releases tab [here](https://github.com/estcube/Telemetry-Forwarding-Client/releases).
For more information be sure to visit our [wiki](https://github.com/estcube/Telemetry-Forwarding-Client/wiki)!