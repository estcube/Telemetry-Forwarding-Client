# Database Schema

The client uses a SQLite3 database for storing the persistent data received from the satellite.

On every startup, the client opens the database at the configured path (creates it if it doesn't exist
yet) and runs the table creation commands, which create the tables if they do not exist.

## Schema

Three tables are used. The first one is used for logging all the AX.25 frames with a matching `SRC`
along with the receive timestamp.

```sql
create table if not exists ax_frame (
    time text,
    data blob
);
```

The second table holds a record for each decoded telemetry packet received, along with the receive
timestamp and the timestamp of when the packet was sent, taken from within the received packet.

```sql
create table if not exists telemetry_packet (
    id integer primary key autoincrement,
    packet_timestamp text,
    receive_timestamp text
);
```

The third table holds key value records for telemetry_packets, with one row for each field. The
`field_name` represents the id of the field in the `telemetry.json` configuration.

```sql
create table is not exists telemetry_field (
    field_name text,
    value text,
    packet_id integer,
    foreign key(packet_id) references telemetry_packet(id)
);
```
