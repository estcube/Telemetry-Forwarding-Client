# ESTCube2 Telemetry

The ESTCube-2 telemetry decoder and relay will be open-source software, which allows radio amateurs from around the world, to downlink telemetry data sent by the satellite and
see the received results locally. It should also be able to relay the received packets to Mission Control of ESTCube.
This allows the ESTCube team to receive telemetry data, even when the satellite isn't accessible from Estonia. This is important, because the fly-over times of the satellite are relatively brief. The system will be a cross-platform console application that interfaces with a TNC, which will also serve a web frontend, which handles the displaying of data.

## Requirements

* Python 3
* requests
* flask
* flask-cors
* flas-swagger-ui
* kaitaistruct
<!-- * bitarray ([Github](https://github.com/ilanschnell/bitarray)) -->
* kiss ([Use this repository](https://gitlab.com/martmaemees/kiss))
* apsw ([Github](https://github.com/rogerbinns/apsw)) ([Do not install from PyPI!](https://rogerbinns.github.io/apsw/download.html#easy-install-pip-pypi))

The libraries can be installed with pip (except `apsw`, see the link in list for installation instructions.) (`pip install --user flask kaitaistruct flask-cors flask-swagger-ui`)

For installing kiss, use the forked repository: `pip install --user git+https://gitlab.com/martmaemees/kiss`

<!-- ### Installation on Windows

Installation of the `kiss` package might fail on Windows. If it does clone the fork [https://github.com/martmaemees/aprs](https://github.com/martmaemees/aprs) and run the `setup.py` file

```
python setup.py install
```

This should properly install the aprs package and the kiss package which it depends on. -->

## Running

The packaged version of the client can be downloaded from the downloads section of the repository, the artifact is named `build-client`. This contains the client python source files, the configuration file and the built static frontend files ready for use.
**This does not mock the TNC! See more at "Notable Known Bugs" section in Wiki**.

### Configuration file

The configuration file is `configuration.ini`.

A custom path for the configuration file can also be given, when the program is run with the argument `-c <file-path>`. In this case, the file path is relative to the users working directory.

The sample file contains comments explaining what the parameters do.

### Running the client

The file to execute is `src/main.py` inside the downloaded `build-client` folder, not in the repository folder. This can be done from the command line, if the Python 3 executable is mapped to python:

```
python src/main.py
```

When client is running, you can open your browser, which has to have JavaScript enabled, and go to `localhost:5000` (if port 5000 was not changed in `configuration.ini`) to view the web frontend.

## Developing

### Client

The repository contains a sample configuration file `client/configuration.ini.sample`, this should be copied to `client/configuration.ini` and values should be changed to suit your needs.

To run the client, execute `python client/src/main.py`.

If you have built the frontend, you can configure the backend to serve the built files (this will not allow hot-reloading).
In `configuration.ini`, set the `static-files-path` field to point to the built files relative to the `client/src/main.py` file (default location for dev build is `../../frontend/app/dist/).

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

#### Running the frontend locally

1.  Open up your preferred terminal window.
2.  Clone the project into suitable directory by typing `git clone https://gitlab.com/martmaemees/estcube2-telemetry.git`.
3.  Change directory into `frontend/`.
4.  Install dependencies in `frontend/` by typing `yarn install`.
5.  Wait until installation finishes.
6.  Serve the application by typing `yarn serve`.
7.  Wait until project is served.
8.  To open the frontend, open up your preferred Web browser and go to `localhost:3000`.

#### Building the frontend

Once you have installed the frontend dependencies (see previous section) you can build the frontend.
In the directory `frontend/`, run `yarn build`, to build the application frontend into `frontend/app/dist/`.
For building the frontend in production mode, use `yarn build:prod`.
