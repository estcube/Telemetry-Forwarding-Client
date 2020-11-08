"""
Module containing the relay for sending the received packets to Mission Control with SIDS.
"""

import logging
import threading
import time
from enum import Enum, auto
import requests
from conf import Configuration
from ax_listener import AXFrame
from rw_lock import ReadWriteLock
from db_interface import TelemetryDB

class RelayStatus(Enum):
    """ The different result states of the last SIDS request. """
    NO_REQUESTS = auto() # No requests have been done yet.
    TURNED_OFF = auto()
    SUCCESS = auto() # Last request went through successfully.
    CONNECTION_ERROR = auto()
    TIMEOUT = auto()
    NOT_FOUND = auto()
    REQUEST_EXCEPTION = auto()
    UNKNOWN_EXCEPTION = auto()

class SIDSRelay(object):
    """ Class that contains the function for sending the packets.
        https://github.com/daniestevez/gr-satellites/blob/master/docs/Dombrovski%2C%20Simple%20Downlink%20Share%20Convention.pdf
    """

    _logger = logging.getLogger(__name__)

    def __init__(self, config: Configuration, database: TelemetryDB):
        self.config = config
        self.db = database
        self.lock = ReadWriteLock()
        self.last_status = RelayStatus.NO_REQUESTS
        self.request_counter = 0
        self.failed_in_a_row = 0
        threading.Thread(target=self.relay_unrelayed_packets_every_interval).start()


    def ping_connection(self):
        url = self.config.get_conf("Mission Control", "mcs-relay-url")
        response = requests.get(url)
        if 200 <= response.status_code < 300:
            return True
        return False

    def relay_unrelayed_packets(self):
        self.failed_in_a_row = 0
        while True:
            frames = self.db.get_unrelayed_frames(100)
            for frame in frames:
                self.relay(frame)
            if len(frames) < 100:
                break

    def start_pinger(self):
        while True:
            if self.ping_connection():
                self.failed_in_a_row = 0
                self.relay_unrelayed_packets()
                break
            time.sleep(int(self.config.get_conf("Client", "ping-interval")))

    def relay_unrelayed_packets_every_interval(self):
        while True:
            if str(self.config.get_conf("Mission Control", "relay-enabled")) == "True":
                if self.ping_connection():
                    self.relay_unrelayed_packets()
            time.sleep(int(self.config.get_conf("Client", "relay-interval")))


    def relay(self, frame: AXFrame):
        """ If relaying is enabled, sends the frame to the configured SIDS server. """
        self._logger.debug("Received frame.")

        # FIXME: Conf can return both str and bool.
        if str(self.config.get_conf("Mission Control", "relay-enabled")) != "True" or self.failed_in_a_row > int(self.config.get_conf("Client", "lost-packet-count")):
            return

        params = {
            "noradID": self.config.get_conf("Mission Control", "norad-id"),
            "source": self.config.get_conf("Mission Control", "receiver-callsign"),
            "timestamp": frame.recv_time.isoformat(),
            "frame": frame.frame.hex(),
            "locator": "longLat",
            "longitude": self.config.get_conf("Mission Control", "longitude"),
            "latitude": self.config.get_conf("Mission Control", "latitude"),
            #TODO: Implement optional functionality?
            "tncPort": 0,
            "azimuth": 0,
            "elevation": 0,
            "fUp": 0,
            "fDown": 0
        }

        url = self.config.get_conf("Mission Control", "mcs-relay-url")
        self._logger.debug("Sending SIDS request to %s", url)
        type = self.config.get_conf("Mission Control", "relay-request-type")
        with self.lock.write_lock:
            try:
                if type == "POST":
                    response = requests.post(url, json=params)
                else:
                    response = requests.get(url, params=params)

                self._logger.debug("SIDS response (%s): %s", response.status_code, response.text)
                if response.status_code >= 200 and response.status_code < 300:
                    self.request_counter += 1
                    self.last_status = RelayStatus.SUCCESS
                    self.db.mark_as_relayed(frame)
                    self.failed_in_a_row = 0

                elif response.status_code == 404:
                    self.last_status = RelayStatus.NOT_FOUND
                else:
                    self.last_status = RelayStatus.UNKNOWN_EXCEPTION
            except requests.ConnectionError:
                self._logger.warning("Connection failed to SIDS endpoint %s", url)
                self.last_status = RelayStatus.CONNECTION_ERROR
            except requests.Timeout:
                self._logger.warning("Connection to SIDS endpoint %s timed out.", url)
                self.last_status = RelayStatus.TIMEOUT
            except requests.RequestException:
                self._logger.warning("Something went wrong with the SIDS endpoint %s request.", url)
                self.last_status = RelayStatus.REQUEST_EXCEPTION
            except Exception as exc:
                self.last_status = RelayStatus.UNKNOWN_EXCEPTION
                raise exc
        self._logger.debug(self.request_counter)

        if self.last_status != RelayStatus.SUCCESS:
            self.failed_in_a_row += 1
            if self.failed_in_a_row > int(self.config.get_conf("Client", "lost-packet-count")):
                self.start_pinger()



    def get_status(self):
        """ Returns the status of the last SIDS request and the number of successful requests. """
        with self.lock.read_lock:
            return {
                "lastStatus": self.last_status.name if \
                    str(self.config.get_conf("Mission Control", "relay-enabled")) == "True" \
                        else RelayStatus.TURNED_OFF.name,
                "requestCount": self.request_counter
            }
