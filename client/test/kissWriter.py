import kiss
import time
import socket
import logging

# bytearray(b'\x00\r\x88\xd4\xb2\xa9\xbf\x04\x8a\xf2s\xcf\x8b\xa7\xcf\xc0\xf1'),
# bytearray(b'\x00\xcbtZa,\x07\x9c\xc3"u\xe7'),
# bytearray(b'\x00Qx\xe1U\xc9\\\xcc\x8a\xe0\xed\xb6\x92\xadV\x0e\x81\\')

packets = [
    # b'~\xa8\x8a\x98@@@`\x8a\xa6\xa8\x86\xaa\x84`\x03\xf0\x10\x1eiN+K\x92*\xcf\x07\xfc\x00',
    b"~\x8a\xa6j\x8a@@`\x8a\xa6j\x8a\x86@a\x03\xf0\x00\x00\x00\x01\x00q?GmN2dzpYLYwjafRIg30bY;BJ:K/JyOUu1tVqkch\\TN>dx~"
]


class TCPKISSServer(kiss.KISS):

    """KISS TCP Class modified."""

    def __init__(self, host, port, strip_df_start=False):
        self.address = (host, int(port))
        self.clientSock = None
        self.strip_df_start = strip_df_start
        super(TCPKISSServer, self).__init__(strip_df_start)

    def _read_handler(self, read_bytes=None):
        return b''

    def stop(self):
        if self.clientSock:
            self.clientSock.close()
            self.clientSock = None
            logging.info("Closed client socket.")
        if self.interface:
            self.interface.shutdown(socket.SHUT_RDWR)
            self.interface.close()
            self.interface = None
            logging.info("Closed server socket.")

    def start(self):
        """
        Initializes the KISS device and commits configuration.
        """
        self.interface = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.interface.bind(self.address)
        self._logger.info('Socket bound to %s', self.address)
        self.interface.listen()
        self._logger.info('Listening for a connection on %s', self.address)
        self.clientSock, addr = self.interface.accept()
        self._write_handler = self.clientSock.send

    def write(self, frame):
        """
        Writes frame to KISS interface.

        :param frame: Frame to write.
        """
        self._logger.debug('frame(%s)="%s"', len(frame), frame)

        frame_escaped = kiss.escape_special_codes(frame)
        self._logger.debug(
            'frame_escaped(%s)="%s"', len(frame_escaped), frame_escaped)

        frame_kiss = b''.join([
            kiss.FEND,
            kiss.DATA_FRAME,
            frame_escaped,
            kiss.FEND
        ])
        self._logger.debug(
            'frame_kiss(%s)="%s"', len(frame_kiss), frame_kiss)

        self._write_handler(frame_kiss)


def main():
    logging.basicConfig(format="%(asctime)s : %(message)s", level=logging.INFO)

    ki = TCPKISSServer(host="localhost", port=3030)
    try:
        ki.start()

        i = 0
        while True:
            ki.write(packets[i % len(packets)])
            logging.info("Sent message: {}".format(packets[i % len(packets)]))
            i += 1
            time.sleep(10)

    except KeyboardInterrupt:
        pass
    except:
        pass

    logging.info("Exiting kissWriter")
    ki.stop()

if __name__ == "__main__":
    main()
