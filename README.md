# ESTCube2 Telemetry

TODO: Description

## Requirements

* Python 3
* flask
* kaitaistruct
* bitarray ([Github](https://github.com/ilanschnell/bitarray))
* kiss ([Github](https://github.com/ampledata/kiss))

The libraries can be installed with pip (`pip install flask kaitaistruct bitarray kiss`)

### Installation on Windows

Installation of the `kiss` package might fail on Windows. If it does clone the fork [https://github.com/martmaemees/aprs](https://github.com/martmaemees/aprs) and run the `setup.py` file

```
python setup.py install
```

This should properly install the aprs package and the kiss package which it depends on.

## Running

The packaged version of the client can be downloaded from the downloads section of the repository, the artifact named "build-client". This contains the client python source files, the configuration and the build static frontend files ready for use.

### Configuration file

The configuration file is `configuration.ini`.

A custom path for the configuration file can also be given, when the program is run with the argument `-c <file-path>`. In this case, the file path is relative to the users working directory.

The sample file contains comments explaining what the parameters do.

### Running the client

The file to execute is `src/main.py`. This can be done from the command line, if the Python 3 executable is mapped to python:

```
python src/main.py
```

## Developing

### Client

The repository contains a sample configuration file `client/configuration.ini.sample`, this should be copied to `client/configuration.ini` and values should be changed to suit your needs.

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
3.  Change directory into `frontend/`.
4.  Install dependencies in `frontend/` by typing `yarn install`.
5.  Wait until installation finishes.
6.  Serve the application by typing `yarn serve`.
7.  Wait until project is served.
8.  To open the frontend, open up your preferred Web browser and go to `localhost:3000`.
