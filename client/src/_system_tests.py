"""
Asserts for system tests.
These are meant to be run by the sys_test.py script.
"""

import unittest
import sqlite3
import os

class SysTest(unittest.TestCase):
    testPath = os.path.join(os.path.dirname(__file__), "__test__")
    dbPath = os.path.join(testPath, "systest.db")

    axPacket = b'\xa8\x8a\x98\x8a\x9a@`\x8a\xa6j\x8a\x86@w\x03\xf0\x04\x01\x1a\xf7\xab\xca\xbc\x00N]\xce\xe4\xf7\xbb\xcc\xdd\xee\xff\xbb\xaa\xbb\xaa\xbb\xaa\xbb\xac\xab\xac\xab\xac\xab\xaa\xbb\xaa\x8d\xc1i\t'

    def test_checkDBEntry(self):
        conn = sqlite3.connect(self.dbPath)
        cur = conn.cursor()
        cur.execute("select count(*) from ax_frame;")
        data = cur.fetchone()[0]
        self.assertGreaterEqual(data, 1)

        cur.execute("select count(*) from telemetry_packet;")
        data = cur.fetchone()[0]
        self.assertGreaterEqual(data, 1)

        cur.execute("select count(*) from telemetry_field;")
        data = cur.fetchone()[0]
        self.assertGreaterEqual(data, 10)

if __name__ == "__main__":
    unittest.main()
