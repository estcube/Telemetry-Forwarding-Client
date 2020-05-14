# ESTCube-2 Telemetry Forwarding Client

The ESTCube-2 telemetry forwarding client (_decoder and relay_) is open-source software. It enables radio amateurs from around the world to downlink telemetry data and view them on a dashboard locally.

When allowed, it relays the received packets to ESTCube Mission Control in Tartu, Estonia. This allows the ESTCube team to receive telemetry data, even when the satellite isn't accessible over Estonia. This is vital as the fly-over times of the satellite are relatively brief.

This is a cross-platform console application that interfaces with a [TNC](https://en.wikipedia.org/wiki/Terminal_node_controller) and serves a dashboard front-end for browsers.

### Running

The downloads for the package of latest release can be found [here](https://github.com/estcube/Telemetry-Forwarding-Client/releases).

**WARNING: The client serves a front-end GUI to `localhost`, on a configured port (default 5000). This should not be opened to the**
**public through the firewall, for the application is intended to only be run in a local environment and thus has no security guards implemented.**

The windows package includes an `.exe` file with all the required dependencies.
The executable file will run the client and serve the front-end on the configured port.

The universal package includes the python source files, which have to be run with a Python 3 runtime that has the [dependencies](#dependencies) installed.
To run the client, run the `src/main.py` file with Python 3 (e.g. `python3 src/main.py`).

When client is running, you can open your browser, which has to have JavaScript enabled, and go to `localhost:5000`
(if port 5000 was not changed in `configuration.ini`) to view the web front-end.

### Configuration file

The configuration file is `configuration.ini`. When the client is running, most configuration parameters can be modified through the front-end as well.

**WARNING: The configuration file itself should only be changed while the client is not running. The client will only read the values from the file during startup and may overwrite the values changed during execution.**

The more detailed description of configuration parameters can be seen [here](/doc/configuration.md).

A custom path for the configuration file can also be given, when the program is run with the argument `-c <file-path>`. In this case, the file path is relative to the users working directory.

The sample file contains comments explaining what the parameters do.

### Kaitai compiler

For updating the telemetry configuration files to work, the [Kaitai Struct Compiler](http://kaitai.io/) must be downloaded.
The `kaitai-compiler-path` configuration parameter in the client configuration must point to the executable file.

### Dependencies

* Python 3
* requests
* flask
* flask-cors
* flask-swagger-ui
* kaitaistruct
* kiss ([Use this repository](https://github.com/estcube/kiss))
* apsw ([Github](https://github.com/rogerbinns/apsw)) ([Do not install from PyPI!](https://rogerbinns.github.io/apsw/download.html#easy-install-pip-pypi))

The libraries can be installed with pip (except `apsw`, see the link in list for installation instructions): `pip install --user -r requirements.txt`

For installing KISS, use the forked repository: `pip install --user git+https://github.com/estcube/kiss`

### Developing

#### Client

The repository contains a sample configuration file `client/configuration.ini.sample`, this should be copied to `client/configuration.ini` and values should be changed to suit your needs.

To run the client, execute `python3 client/src/main.py`.

If you have built the front-end, you can configure the back-end to serve the built files (client is not capable of hot-reloading, so if you are working on the front-end you might still want to use `yarn serve`).
In `configuration.ini`, set the `static-files-path` field to point to the built files relative to the `client/src/main.py` file (default location for dev build is `../../frontend/app/dist/).

#### Mocking the TNC

```
python3 client/test/kissWriter.py
```

This will set up a simple mocked TNC that will listen for connections on `localhost:3030` and continuously transmit randomly generated beacon data packets through KISS to a connected interface.

#### Telemetry configuration

The configuration of the AX.25 payload structure is specified in a [kaitai](http://kaitai.io/#what-is-it) file (`.ksy`).

The configuration of the telemetry fields inside that structure, is specified in a json file. The client is able to download
new versions of these files from the configured endpoints. Both files are then overwritten to the configured path and the kaitai
file is compiled into the `src/icp.py` file (overwriting the old one).

More information on the configuration files can be found in the [documentation](/doc/data_conf_spec.md).

### Front-end

The front-end consists of the `app` React application and the `data-lib` React component library.

#### data-lib

The library contains reusable components for displaying the telemetry data in a dynamic way configurable through the
[telemetry configuration](#telemetry-configuration) file.

The core component there is `SatelliteData.tsx` which gets decoded telemetry packets and telemetry configuration as props.
It renders the data charts and table.
The supported chart types currently are `line` and `enum`, which correspond to line charts and timeline charts.

#### app

Contains components for configuration client, managing the TNC connection, showing current satellite location and timeframe
of next pass. Uses the `data-lib` to display the telemetry data on the dashboard.

The configuration page is rendered dynamically from the constraint values which are fetched from the client api.
The supported field types are `int`, `float`, `str`, `bool` and `select` (dropdown selection).
There are components for each field type available in the `ConfigurationFormFields` sub-folder.

#### Requirements

* yarn (latest)
* Node.js (latest)

##### Installation of yarn

To install yarn, head to [yarn download page](https://yarnpkg.com/lang/en/docs/install/) and follow the instructions there.

##### Installation of Node.js

To install Node.js, head to [Node.js download page](https://nodejs.org/en/) and follow the instructions there.

#### Running the front-end locally

1.  Open up your preferred terminal window.
2.  Clone the project into suitable directory by typing `git clone https://gitlab.com/martmaemees/estcube2-telemetry.git`.
3.  Change directory into `frontend/`.
4.  Install dependencies in `frontend/` by typing `yarn install`.
5.  Wait until installation finishes.
6.  Serve the application by typing `yarn serve`.
7.  Wait until project is served.
8.  To open the front-end, open up your preferred Web browser and go to `localhost:3000`.

#### Building the front-end

Once you have installed the front-end dependencies (see previous section) you can build the front-end.
In the directory `frontend/`, run `yarn build`, to build the application front-end into `frontend/app/dist/`.
For building the front-end in production mode, use `yarn build:prod`.

### Testing

#### Front-end

The front-end tests can be run after installing the front-end dependencies and running `yarn test` in the
`/frontend` folder. This runs the tests in both the `app` application and `data-lib` library.

#### Client

The unit tests can be run with `python client/src/_unit_tests.py`.

The system tests can be run on unix systems with the `client/sys_test.sh` shell script. It runs both the kissWriter and
client for 7 seconds and then runs the checks in `client/src/_system_tests.py`.

### Packaging

Once the front-end is built, the application can be packaged into a minimal distributable.

#### Universal

The universal package can be built, using the `client/build.sh` shell script. It mostly just does file copying a renaming.
The end result will be put into the `dist` folder.

#### Windows

The windows specific packaging is done using `pyinstaller`. The source is packaged into an `.exe` file along with
all the dependencies and the python 3 runtime.

When running `pyinstaller`, the `csv` module has to be marked as a hidden import alongside all the modules that
`src/icp.py` imports. The `icp` module needs to be excluded from the package and copied independently into the `src/`
folder of the distributable, since this file is overwritten by the configuration updater.
