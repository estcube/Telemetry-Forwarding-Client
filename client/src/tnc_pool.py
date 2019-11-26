import logging
import time
from enum import Enum
from typing import Callable, Dict
from threading import Thread, Lock
import kiss

class ConnectionType(Enum):
    TCPIP = 0,
    RS232 = 1

class ConnectionProtocol(Enum):
    KISS = 0

class ConnectionConfiguration:
    def __init__(self, type: ConnectionType, protocol: ConnectionProtocol, ip: str, port: str,
            retry_attempts: int, retry_time: int):
        self.type = type
        self.protocol = protocol
        self.ip = ip
        self.port = port
        self.retry_attempts = retry_attempts
        self.retry_time = retry_time

class TNCThread(Thread):
    def __init__(self, name: str):
        Thread.__init__(self)
        self.connected = False
        self.lock = Lock()
        self.name = name

    def is_connected(self) -> bool:
        with self.lock:
            return self.connected

    def set_connected(self, val: bool):
        with self.lock:
            self.connected = val

class TCPKISSThread(TNCThread):

    _log = logging.getLogger(__name__)

    def __init__(self, name: str, conn_conf: ConnectionConfiguration, callback: Callable):
        TNCThread.__init__(self, name)
        self.kiss = kiss.TCPKISS(conn_conf.ip, conn_conf.port, strip_df_start=True)
        self.conn_conf = conn_conf
        self.callback = callback

    def run(self):
        conn_tries = 0
        while True:
            try:
                self.kiss.start()
                break
            except ConnectionRefusedError:
                self._log.warning("Could not initialize a TCP connection to %s:%s",
                                  self.conn_conf.ip, self.conn_conf.port)
                if conn_tries < self.conn_conf.retry_attempts:
                    conn_tries += 1
                    self._log.info("Retrying TNC %s connection in %d seconds...", self.name,
                                   self.conn_conf.retry_time)
                    time.sleep(self.conn_conf.retry_time)
                else:
                    self._log.warning("Maximum TNC %s connection retries reached.", self.name)
                    return
        try:
            self.set_connected(True)
            self.kiss.read(callback=self.callback) # TODO: Extend the class and allow termination?
        finally:
            self.set_connected(False)
            self.kiss.stop()

class TNCPool():

    _log = logging.getLogger(__name__)

    def __init__(self):
        self.tnc_connections = dict()
        self.lock = Lock()

    def __get_conn(self, name: str) -> TNCThread:
        """ Getter function pretty much just to get type to variable. """
        return self.tnc_connections.get(name, None)

    def connect_tnc(self, name: str, conn_conf: ConnectionConfiguration, callback: Callable):
        if not callable(callback):
            raise ValueError("The callback has to be a callable function.")

        with self.lock:
            conn = self.__get_conn(name)
            if conn is not None:
                if conn.is_alive():
                    self._log.info("Tried to start TNC connection %s, but it's already running", name)
                    return

            if conn_conf.protocol == ConnectionProtocol.KISS:
                if conn_conf.type == ConnectionType.TCPIP:
                    tcp_thread = TCPKISSThread(name, conn_conf, callback)
                    tcp_thread.start()
                    self.tnc_connections[name] = tcp_thread

    def stop_tnc(self, name: str):
        pass

    def check_tnc(self, name: str):
        pass