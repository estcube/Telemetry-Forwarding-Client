"""
Provides a class for interfacing with the database.
"""

import logging
from datetime import datetime
from typing import TYPE_CHECKING
import apsw
from ax_listener import AXFrame

if TYPE_CHECKING:
    from telemetry_listener import TelemetryFrame

CONN_TIMEOUT = 2000


class TelemetryDB:
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
        self.conn = apsw.Connection(self.conn_str)

    def init_db(self):
        """
        Initializes the tables of the database if they don't already exist.
        Supposed to be called in the beginning of program execution, before any listening is
        started.
        """
        self._logger.info("Initializing database at %s", self.conn_str)
        cur = self.conn.cursor()
        cur.execute("""
                                create table if not exists ax_frame (
                                    frame_id integer primary key autoincrement,
                                    frame_data blob,
                                    needs_relay bit,
                                    frame_timestamp text
                                );
                            """)
        cur.execute("""
                                create table if not exists telemetry_packet (
                                    packet_id integer primary key autoincrement,
                                    packet_json text,
                                    frame_id integer,
                                    packet_timestamp integer,
                                    foreign key(frame_id) references ax_frame(frame_id)
                                );
                            """)

    def insert_ax_frame(self, frame: AXFrame):
        """
        Insert a single ax.25 frame into the database log.
        Will store the entire frame in a blob along with its recv_time.
        """
        self.conn.setbusytimeout(CONN_TIMEOUT)
        cur = self.conn.cursor()
        cur.execute("insert into ax_frame values (?, ?, ?, ?);", (None, frame.frame, True, frame.recv_time.isoformat()))

    def get_unrelayed_frames(self, n=0):
        if n == 0:
            query = "select * from ax_frame where needs_relay = TRUE"
        else:
            query = "select * from ax_frame where needs_relay = TRUE LIMIT " + str(n)
        self.conn.setbusytimeout(CONN_TIMEOUT)
        cur = self.conn.cursor()
        res = cur.execute(query)

        frames = []

        for row in res:
            frames.append(
                AXFrame(None, None, None, None, None, None, row[1], datetime.strptime(row[3], "%Y-%m-%dT%H:%M:%S.%f"))
            )

        return frames

    def mark_as_relayed(self, frame: AXFrame):
        self.conn.setbusytimeout(CONN_TIMEOUT)
        cur = self.conn.cursor()
        cur.execute("UPDATE ax_frame SET needs_relay = FALSE WHERE frame_timestamp = ? AND frame_data = ?;",
                    (frame.recv_time.isoformat(), frame.frame))

    def add_telemetry_frame(self, frame: "TelemetryFrame"):
        """
        Adds the telemetry data into the database.
        """
        self.conn.setbusytimeout(CONN_TIMEOUT)
        cur = self.conn.cursor()

        try:
            new_id = cur.execute(
                "select frame_id from ax_frame where frame_id = (select max(frame_id) from ax_frame);").fetchone()[0]
            cur.execute("""
                insert into telemetry_packet values (?, ?, ?, ?);""",
                        (None, frame.fields, new_id, frame.timestamp))
        except Exception as exception:
            raise exception

    def __exit__(self):
        self.conn.close()
