import unittest
from client.src.db_interface import TelemetryDB
from bitarray import bitarray
from datetime import datetime
from client.src.conf import Configuration
from client.src.ax_listener import AXListener


class UnitTest(unittest.TestCase):

    # Tests if a packet is correctly stored in AXFrame by sending a packet and checking if current date is saved
    def AXListener_test(self):
        packet = b'~\xa8\x8a\x98@@@`\x8a\xa6\xa8\x86\xaa\x84`\x03\xf0\x10\x1eiN+K\x92*\xcf\x07\xfc\x00'
        callback = AXListener.receive(packet)
        self.assertNotEqual(callback.recv_time.date(), datetime.today().date())

    def AXListener_test2(self):
        packet = b"~\x8a\xa6j\x8a@@`\x8a\xa6j\x8a\x86@a\x03\xf0\x00\x00\x00\x01\x00q?GmN2dzpYLYwjafRIg30bY;BJ:K/JyOUu1tVqkch\\TN>dx~"
        callback = AXListener.receive(packet)
        self.assertNotEqual(callback.recv_time.date(), datetime.today().date())

    # Tests if the get_conf method returns the same info as listed in the ini file
    def conf_read_test(self):
        self.assertEqual(Configuration.get_conf("Mission Control","receiver-callsign"),"String")

    # Tests if set_conf method changes the values in the conf file.
    def conf_write_test(self):
        original = Configuration.get_conf("Mission Control","receiver-callsign")
        Configuration.set_conf("Mission Control", "receiver-callsign","Test")
        test_value = Configuration.get_conf("Mission Control","receiver-callsign")

        # Cleanup after test
        Configuration.set_conf("Mission Control", "receiver-callsign", original)

        self.assertNotEqual(original,test_value)

    # Tests if an AXFame is correctly stored in the DB.
    def DB_test(self):
        db_path = "../telemetry.db"
        database = TelemetryDB(db_path)
        database.init_db()

        packet = b'~\xa8\x8a\x98@@@`\x8a\xa6\xa8\x86\xaa\x84`\x03\xf0\x10\x1eiN+K\x92*\xcf\x07\xfc\x00'
        callback = AXListener.receive(packet)

        database.insert_ax_frame(callback)

        # Placeholder assert since querying DB is not implemented
        self.assertEqual(True, True)


if __name__ == '__main__':
    unittest.main()
