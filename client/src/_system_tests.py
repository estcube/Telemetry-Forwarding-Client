"""
Asserts for system tests.
These are meant to be run by the sys_test.py script.
"""

import unittest
import apsw
import os

class SysTest(unittest.TestCase):
    testPath = os.path.join(os.path.dirname(__file__), "__test__")
    dbPath = os.path.join(testPath, "systest.db")

    axPacket = b'\x9a\x92\x86\xa8\xa4\x98`\x8a\xa6\xa8\x86\xaa\x84w\x03\xf0\x01\x074\xf7\x9a\xbaZ\x03${]\xa8_,\x01\x0f\x00\x00\x00\t\x05\x00\x00\x00\x9a\x00\x00\x00\x03\xd2\x04\x00\x00\xea\x04\x00\x00\xb0\x04b\xbd\x0190_\xd6\xff\xff\xff\xff\x0f\xfe\xc8\xfe\xc8d\x08\x0c4:\x05\x05\xe7x~'

    def test_checkDBEntry(self):
        conn = apsw.Connection(self.dbPath)
        cur = conn.cursor()
        cur.execute("select count(*) from ax_frame;")
        data = cur.fetchone()[0]
        self.assertGreaterEqual(data, 1)

        cur.execute("select count(*) from telemetry_packet;")
        data = cur.fetchone()[0]
        self.assertGreaterEqual(data, 1)
        
if __name__ == "__main__":
    unittest.main()
