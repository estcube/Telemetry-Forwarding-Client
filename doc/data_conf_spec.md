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
  "prefix": "str",
  "msgTimestamp": {
    "id": "str",
    "type": "unix_timestamp"
  },
  "fields": [
    {
      "id": "str",
      "type": "str",
      "unit": "str (not needed for timestamp types)",
      "label": "str (not needed for isMsgTimestamp == True field"
    }
  ],
  "graphs": [
    {
      "xAxis": "str",
      "yAxis": ["str", ],
      "title": "str",
      "type": "str"
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

The fields array contains all the telemetry fields that will actually be displayed in the frontend.

`msgTimestamp` object marks the timestamp field which describes the time the packet was sent out
from the source. The type describes how the timestamp is stored in the packet. The timestamps are always
sent to the server in ISO format.

Other fields will define their type, unit and label, which will be used for displaying them to the
user.

Example: [/client/spec/telemetry.json](../client/spec/telemetry.json)

### Configuring frontend graphs

The `graphs` array will contain a sequence of object which each describe one graph in the frontend.
The `xAxis` field defines the *id* of one value and the `yAxis` field will define an array of *ids*
which will be displayed in the graphs.
