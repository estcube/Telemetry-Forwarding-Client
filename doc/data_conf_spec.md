# Telemetry Data Configuration Specification

## AX.25 Payload structure

The AX.25 frame payload structure is to be described in a [Kaitai](https://kaitai.io/) structure file.
This configuration will specify, how the payload blob is broken down into different pieces.

Example: [/client/spec/icp.ksy](../client/spec/icp.ksy)

## Telemetry fields

The configuration that is used to display the data in the frontend, is written in a JSON configuration.

The configuration structure will be as follows:
```json
{
  "prefix": "data.payload",
  "msgTimestamp": {
    "id": "timestamp",
    "type": "unix_timestamp"
  },
  "fields": [
    {
      "id": "bat_a_temp",
      "type": "int",
      "unit": "V",
      "label": "Battery A Temperature"
    },
    {
      "id": "bat_b_temp",
      "type": "int",
      "unit": "V",
      "label": "Battery B Temperature"
    },
    {
      "id": "sat_mission_phase",
      "type": "enum",
      "label": "Satellite mission phase",
      "values": [
        "Detumbling",
        "Nadir pointing",
        "Tether deployment",
        "E-sail force measurement"
      ]
    }
  ],
  "graphs": [
    {
      "xAxis": "timestamp",
      "yAxis": ["bat_a_temp", "bat_b_temp"],
      "title": "Battery temperatures",
      "type": "line"
    }
  ]
}
```

The IDs, represent paths delimited by dots (`.`) that are used for traversing the object graph defined
by the [AX.25 Payload Configuration](#ax25-payload-structure).

The `prefix` id represents the point in the object graph
which holds the telemetry data. Every member field of the object at the prefix path (nested fields
are supported) is persisted into the database. If any of the prefix segments is not found, the whole
packet is counted as not a telemetry packet and not processed.

The fields array contains all the telemetry fields that will actually be displayed in the frontend
data table.

`msgTimestamp` object marks the timestamp field which describes the time the packet was sent out
from the source. The type describes how the timestamp is stored in the packet. The timestamps are always
sent to the server in ISO format.

Other fields will define their type, unit and label, which will be used for displaying them to the
user.

#### Supported types for fields are:
* int
* float
* enum

#### Enum type
The `enum` type will map unsigned integer values (0, 1, 2...) to the strings provided in the `values`
array of the field by the array index.

Example: [/client/spec/telemetry.json](../client/spec/telemetry.json)

### Configuring frontend graphs

The `graphs` array will contain a sequence of object which each describe one graph in the frontend.
The `xAxis` field defines the *id* of one value and the `yAxis` field will define an array of *ids*
which will be displayed in the graphs.

#### The supported types for graphs are:
* line
* enum

## Examples

### Adding a telemetry field

Lets use the [ICP Structure Configuration](../client/spec/icp.ksy) and the example configuration
structure in [Telemetry fields](#telemetry-fields) as a baseline.

Lets say that we want to add the Crash Counter field to the frontend table. For this we find the
field in the Kaitai file and get the path to it.

The field `crash_counter` is inside the `beacon_payload_safe` type which is used in the `payload`
field in the `beacon_packet` type which in turn is used in the `data` field of the root icp packet
if the `cmd` field corresponds to the definedf `command::beacon_data` value.

This means that the path to the crash counter value would be `data.payload.crash_counter`.
If we take a look at the telemetry fields configuration, we see that the `prefix` field already
contains the `data.payload` part, which means that we can exclude that part from our id, when
defining the telemetry field, leaving us with just `crash_counter`.

For the field to show up in the table, we add the following object into the `fields` array of the
telemetry fields configuration file.

```json
{
  "id": "crash_counter",
  "type": "int",
  "unit": "",
  "label": "Number of crashes"
}
```

### Adding a graph of a telemetry field

Lets say that we added the Crash Counter field in the last section and now want to display a graph
of the given value.

To do this, we add the following object to the `graphs` array in the telemetry fields configuration.

```json
{
  "xAxis": "timestamp",
  "yAxis": ["crash_counter"],
  "title": "Number of crashes",
  "type": "line"
}
```

It is important when defining the values of the axes, to use the id without the prefix part
(`crash_counter` instead of `data.payload.crash_counter`).
