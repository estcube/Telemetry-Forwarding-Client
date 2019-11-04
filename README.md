# ESTCube2 Telemetry

TODO: Description

## Running

### Client

The client is currently able to receive KISS packets over TCP/IP and decode AX.25 frames in the payload.

#### Requirements

* Python 3
* flask
* kaitaistruct
* bitarray ([Github](https://github.com/ilanschnell/bitarray))
* kiss ([Github](https://github.com/ampledata/kiss))

The libraries can be installed with pip (`pip install flask kaitaistruct bitarray kiss`)

##### Installation on Windows

Installation of the `kiss` package might fail on Windows. If it does clone the fork [https://github.com/martmaemees/aprs](https://github.com/martmaemees/aprs) and run the `setup.py` file

```
python setup.py install
```

This should properly install the aprs package and the kiss package which it depends on.

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

### Frontend

The frontend currently serves only static pages with sample data displayed.

#### Requirements

* yarn (latest)
* Node.js (latest)

##### Installation of yarn

To install yarn, head to [yarn download page](https://yarnpkg.com/lang/en/docs/install/) and follow the instructions there.

##### Installation of Node.js

To install Node.js, head to [Node.js download page](https://nodejs.org/en/) and follow the instructions there.

##### Running the frontend locally

1.  Open up your preferred terminal window.
2.  Clone the project into suitable directory by typing `git clone https://gitlab.com/martmaemees/estcube2-telemetry.git`.
2.  Change directory into `frontend/`.
3.  Install dependencies in `frontend/` by typing `yarn install`.
4.  Wait until installation finishes.
5.  Serve the application by typing `yarn serve`.
6.  Wait until project is served.
7.  To open the frontend, open up your preferred Web browser and go to `localhost:3000`.
