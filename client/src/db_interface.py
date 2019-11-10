"""
Provides a class for interfacing with the database.
"""

import sqlite3
import logging
from ax_listener import AXFrame

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
        conn = sqlite3.connect(self.conn_str)
        cur = conn.cursor()
        cur.execute("create table if not exists ax_frame (time text, data blob);")
        conn.commit()
        conn.close()

    def insert_ax_frame(self, frame: AXFrame):
        """
        Insert a single ax.25 frame into the database log.
        Will store the entire frame in a blob along with its recv_time.
        """
        conn = sqlite3.connect(self.conn_str)
        cur = conn.cursor()
        cur.execute("insert into ax_frame values (?, ?)", (frame.recv_time.isoformat(), frame.frame))
        conn.commit()
        conn.close()

# def querylastentry():
#     conn = sqlite3.connect('../../db/decoded_data.db')
#     c = conn.cursor()
#     c.execute("SELECT * FROM decoded_data_test ORDER BY time DESC LIMIT 1")
#     out = c.fetchone()
#     conn.commit()
#     conn.close()
#     return out
