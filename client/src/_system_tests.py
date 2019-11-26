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
    # axPacket = b"\x8a\xa6j\x8a@@`\x8a\xa6j\x8a\x86@a\x03\xf0\x00\x00\x00\x01\x00q?GmN2dzpYLYwjafRIg30bY;BJ:K/JyOUu1tVqkch\\TN>dx"
    axPacket = b'\xa8\x8a\x98\x8a\x9a@`\x8a\xa6j\x8a\x86@w\x03\xf0\x04\x01\x1a\xf7\xab\xca\xbc\x00N]\xce\xe4\xf7\xbb\xcc\xdd\xee\xff\xbb\xaa\xbb\xaa\xbb\xaa\xbb\xac\xab\xac\xab\xac\xab\xaa\xbb\xaa\x8d\xc1i\t'

    def test_checkDBEntry(self):
        conn = sqlite3.connect(self.dbPath)
        cur = conn.cursor()
        cur.execute("select data from ax_frame order by time desc limit 1;")
        data = cur.fetchone()[0]

        # self.assertEqual(data, self.axPacket)

if __name__ == "__main__":
    unittest.main()
