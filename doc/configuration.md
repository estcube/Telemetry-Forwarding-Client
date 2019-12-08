# Configuration parameters

The configuration is stored in ini format, and is divided into sections.

## [Mission Control]

### relay-enabled
Type: **boolean** (`True` / `False`)

The received packets will only be relayed to Mission Control if this is turned on.

### mcs-relay-url
Type: **string** (url format)

The url to the endpoint, where the SIDS relay requests will be made.

### relay-request-type
Type: **string** (`GET` / `POST`)

Determines what the http request of the sids relay request will be. The defined endpoint of the SIDS
protocol allows GET requests, that embed all the data into query parameters. Setting this to `POST`
makes the client send the requests as POST with the data put into a json object in the body.

### receiver-callsign
Type: **string** (max. 6 characters)

Callsign of the receiver, relayed in the SIDS request.

### norad-id
Type: **int** (5 digits)

Norad id of the satellite being tracked. Specifies the satellite whose data is displayed in the map
on the dashboard and is relayed in the SIDS request.

### longitude
Type: **float**

Longitude coordinate of the receiver. Will be relayed in the SIDS request.

### latitude
Type: **float**

Latitude coordinate of the receiver. Will be relayed in the SIDS request.

## [TNC interface]

### tnc-protocol-type
Type: **string** (`KISS`)

Protocol used for communication with the TNC. Currently only `KISS` is supported.

### tnc-connection-type
Type: **string** (`TCP/IP`)

Connection type to use for connecting with the TNC. Currently only `TCP/IP` is supported.

### tnc-ip
Type: **string** (ip or hostname)

The ip or hostname of the tnc.

### tnc-port
Type: **int** (1024 - 65535)

The port of the tnc.

### max-connection-attempts
Type: **int**

The maximum number of re-attempts of initiating a connection with a tnc.

### connection-retry-time
Type: **int**

The amount of seconds to wait between connection attempts to the tnc.

### satellite-src
Type: **string** (max. 6 characters)

The callsign of the tracked satellite. All AX.25 packets not originating from given satellite are
discarded.

## [Client]

All paths here are relative to the root folder of the application (where the `configuration.ini`
file is by default).

### database
Type: **string** (path)

The path to the database. If a database doesn't exist on the given path, one will be created.

### static-files-path
Type: **string** (path)

The path to the folder that contains all the static frontend files to be served by the client.

### telemetry-configuration
Type: **string** (path)

The path to the file that contains the specification of fields in the telemetry payload.

### kaitai-configuration
Type: **string** (path)

The path to the kaitai file that contains the specification of the structure of the AX.25 payload.

### telemetry-configuration-url
Type: **string** (url)

The endpoint from which the new telemetry configuration is downloaded when an update to the
configuration is triggered.

### packet-structure-url
Type: **string** (url)

The endpoint from which the new kaitai configuration is downloaded when an update to the
configuration is triggered.

### kaitai-compiler-path
Type: **string** (path)

The path to the kaitai-struct-compiler executable that will be run when an update to the
configuration is triggered.

### frontend-port
Type: **int** (1024 - 65535)

The port on which the frontend is served to `localhost`.

### debug-log
Type: **boolean** (`True` / `False`)

If this is `True`, more extensive logging is output into the console.
