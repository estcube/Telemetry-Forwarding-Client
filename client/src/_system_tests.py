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
    axPacket = b"~\x8a\xa6j\x8a@@`\x8a\xa6j\x8a\x86@a\x03\xf0\x00\x00\x00\x01\x00q?GmN2dzpYLYwjafRIg30bY;BJ:K/JyOUu1tVqkch\\TN>dx~"

    def test_checkDBEntry(self):
        conn = sqlite3.connect(self.dbPath)
        cur = conn.cursor()
        cur.execute("select data from ax_frame order by time desc limit 1;")
        data = cur.fetchone()

        self.assertEqual(data, self.axPacket)

if __name__ == "__main__":
    unittest.main()
