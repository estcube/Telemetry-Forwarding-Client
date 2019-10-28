import sqlite3
import io
import time

# c.execute("""CREATE TABLE decoded_data_test (
# time integer,
# data blob
# )""")

# c.execute("INSERT INTO decoded_data_test VALUES (1570894840, 01001001)")
# c.execute("INSERT INTO decoded_data_test VALUES (1570894940, 01001001001011011111)")
# c.execute("SELECT * FROM decoded_data_test")
# print(c.fetchmany(5))

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
