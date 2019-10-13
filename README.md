# ESTCube2 Telemetry

TODO: Description

## Running

### Client

The client is currently able to receive KISS packets over TCP/IP and decode AX.25 frames in the payload.

#### Requirements

* Python 3
* kiss [Github](https://github.com/ampledata/kiss)
* bitarray [Github](https://github.com/ilanschnell/bitarray)

The libraries can be installed with pip (`pip install kiss bitarray`)

#### Configuration file

The configuration file should be located at `client/configuration.ini`. A sample configuration file that can be used as a baseline is located at `client/configuration.ini.sample`.

Currently only relevant configuration parameters to change, are `tnc-ip` and `tnc-port`, which specify the connection parameters used to connect to the tnc.

#### Running the client

The file to execute is `client/src/main.py`. This can be done from the command line with the repository root as the working directory, if the Python 3 executable is mapped to python:

```
python client/src/main.py
```

The tnc to connect to should already be running and accepting connections.

#### Mocking the TNC

```
python client/test/kissWriter.py
```

This will set up a simple mocked tnc that will listen for connections `localhost:3030` and continuously transmit one sample AX.25 frame through KISS to connected interfaces.

When using this, the client programs (`main.py`) should be exited before the mock server (`kissWriter.py`) to prevent problems.
