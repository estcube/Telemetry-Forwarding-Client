import sqlite3
import time
import logging
from ax_listener import AXFrame

# c.execute("""CREATE TABLE decoded_data_test (
# time integer,
# data blob
# )""")

# c.execute("INSERT INTO decoded_data_test VALUES (1570894840, 01001001)")
# c.execute("INSERT INTO decoded_data_test VALUES (1570894940, 01001001001011011111)")
# c.execute("SELECT * FROM decoded_data_test")
# print(c.fetchmany(5))

class TelemetryDB(object):
    _logger = logging.getLogger(__name__)

    def __init__(self, conn_str):
        self.conn_str = conn_str

    def init_db(self):
        self._logger.info("Initializing database at %s", self.conn_str)
        conn = sqlite3.connect(self.conn_str)
        cur = conn.cursor()
        cur.execute("create table if not exists ax_frame (time integer, data blob);")
        conn.commit()
        conn.close()

    def insert_ax_frame(self, frame: AXFrame):
        conn = sqlite3.connect(self.conn_str)
        cur = conn.cursor()
        cur.execute("insert into ax_frame values (?, ?)", (frame.recv_time, frame.frame))
        conn.commit()
        conn.close()


def dataIntoDBtest(data):
    conn = sqlite3.connect('../../db/decoded_data.db')
    c = conn.cursor()
    currenttime = str(int(time.time()))
    c.execute("INSERT INTO decoded_data_test VALUES (" + currenttime + ", " + data + ")")
    conn.commit()
    conn.close()

def querylastentry():
    conn = sqlite3.connect('../../db/decoded_data.db')
    c = conn.cursor()
    c.execute("SELECT * FROM decoded_data_test ORDER BY time DESC LIMIT 1")
    out = c.fetchone()
    conn.commit()
    conn.close()
    return out

## dataIntoDBtest("10100101011011111")
## print(querylastentry())
