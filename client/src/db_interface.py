"""
Provides a class for interfacing with the database.
"""
# from __future__ import annotations

# import sqlite3
import logging
from datetime import datetime
from collections import defaultdict
import apsw
from typing import TYPE_CHECKING
from ax_listener import AXFrame

if TYPE_CHECKING:
    from telemetry_listener import TelemetryFrame

class TelemetryDB():
    """
    Class for interfacing with the database.

    Currently creates a new connection on every function call.
    """
    _logger = logging.getLogger(__name__)

    def __init__(self, conn_str):
        """
        Sets the connection string for the database that will be used for all
        connections made by this object.
        """
        self.conn_str = conn_str

    def init_db(self):
        """
        Initializes the tables of the database if they don't already exist.
        Supposed to be called in the beginning of program execution, before any listening is
        started.
        """
        self._logger.info("Initializing database at %s", self.conn_str)
        conn = apsw.Connection(self.conn_str)
        cur = conn.cursor()
        cur.execute("create table if not exists ax_frame (time text, data blob);")
        cur.execute("""
                create table if not exists telemetry_packet (
                    id integer primary key autoincrement,
                    packet_timestamp text,
                    receive_timestamp text
                );
                create table if not exists telemetry_field (
                    field_name text,
                    value text,
                    packet_id integer,
                    foreign key(packet_id) references telemetry_packet(id)
                );
            """)
        conn.close()

    def insert_ax_frame(self, frame: AXFrame):
        """
        Insert a single ax.25 frame into the database log.
        Will store the entire frame in a blob along with its recv_time.
        """
        conn = apsw.Connection(self.conn_str)
        cur = conn.cursor()
        cur.execute("insert into ax_frame values (?, ?);", (frame.recv_time.isoformat(), frame.frame))
        conn.close()

    def add_telemetry_frame(self, frame: "TelemetryFrame"):
        """
        Adds the telemetry data into the database.
        """
        conn = apsw.Connection(self.conn_str)
        cur = conn.cursor()

        # cur.setexectrace(self.my_trace)

        try:
            cur.execute("""begin;
                insert into telemetry_packet (packet_timestamp, receive_timestamp)
                values (?, ?);""", (frame.timestamp.isoformat(), frame.recv_timestamp.isoformat()))
            new_id = cur.execute("select last_insert_rowid();").fetchone()[0]
            fields = [(i + (new_id,)) for i in frame.fields]
            cur.executemany(
                "insert into telemetry_field (field_name, value, packet_id) values (?, ?, ?);", fields)
            cur.execute("commit;")
        except Exception as exception:
            cur.execute("rollback;")
            raise exception
        finally:
            conn.close()

    def get_telemetry_data(self, from_ts: datetime = None, to_ts: datetime = None,
                           from_id: int = None):
        query = """select id, packet_timestamp, receive_timestamp, field_name, value
            from telemetry_packet inner join telemetry_field on packet_id = id
            where 1=1 """
        params = {}
        if from_ts is not None:
            query += "and packet_timestamp >= :from_ts "
            params["from_ts"] = from_ts.isoformat()
        if to_ts is not None:
            query += "and packet_timestamp >= :to_ts "
            params["to_ts"] = to_ts.isoformat()
        if from_id is not None:
            query += "and id > :from_id "
            params["from_id"] = from_id
        query += ";"

        results = {}

        conn = apsw.Connection(self.conn_str)
        cur = conn.cursor()

        for ident, packet_ts, recv_ts, f_name, f_val in cur.execute(query, params):
            if ident not in results:
                results[ident] = {"id": ident, "packet_timestamp": packet_ts,
                        "receive_timestamp": recv_ts, "fields": {}}
            field = results[ident]["fields"]
            field[f_name] = f_val

        return list(results.values())

    def my_trace(self, cursor, statement, bindings):
        """ Debug trace function for the cursors. Called just before executing each statement """
        print ("SQL:",statement)
        if bindings:
            print ("Bindings:",bindings)
        return True  # if you return False then execution is aborted

# def querylastentry():
#     conn = sqlite3.connect('../../db/decoded_data.db')
#     c = conn.cursor()
#     c.execute("SELECT * FROM decoded_data_test ORDER BY time DESC LIMIT 1")
#     out = c.fetchone()
#     conn.commit()
#     conn.close()
#     return out
