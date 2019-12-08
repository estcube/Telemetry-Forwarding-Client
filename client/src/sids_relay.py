"""
Module containing the relay for sending the received packets to Mission Control with SIDS.
"""

import logging
from enum import Enum, auto
import requests
from conf import Configuration
from ax_listener import AXFrame
from rw_lock import ReadWriteLock

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
    """ Class that contains the function for sending the packets. """

    _logger = logging.getLogger(__name__)

    def __init__(self, config: Configuration):
        self.config = config
        self.lock = ReadWriteLock()
        self.last_status = RelayStatus.NO_REQUESTS
        self.request_counter = 0

    def relay(self, frame: AXFrame):
        """ If relaying is enabled, sends the frame to the configured SIDS server. """
        self._logger.debug("Received frame.")

        # FIXME: Conf can return both str and bool.
        if str(self.config.get_conf("Mission Control", "relay-enabled")) != "True":
            return

        params = {
            "noradID": self.config.get_conf("Mission Control", "norad-id"),
            "source": self.config.get_conf("Mission Control", "receiver-callsign"),
            "timestamp": frame.recv_time.isoformat(),
            "frame": frame.frame.hex(),
            "locator": "longLat",
            "longitude": self.config.get_conf("Mission Control", "longitude"),
            "latitude": self.config.get_conf("Mission Control", "latitude")
        }

        url = self.config.get_conf("Mission Control", "mcs-relay-url")
        self._logger.debug("Sending SIDS request to %s", url)
        type = self.config.get_conf("Mission Control", "relay-request-type")
        with self.lock.write_lock:
            try:
                response = None
                if type == "POST":
                    response = requests.post(url, json=params)
                else:
                    response = requests.get(url, params=params)
                self._logger.debug("SIDS response (%s): %s", response.status_code, response.text)
                if response.status_code >= 200 and response.status_code < 300:
                    self.request_counter += 1
                    self.last_status = RelayStatus.SUCCESS
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

    def get_status(self):
        """ Returns the status of the last SIDS request and the number of successful requests. """
        with self.lock.read_lock:
            return {
                "lastStatus": self.last_status.name if \
                    str(self.config.get_conf("Mission Control", "relay-enabled")) == "True" \
                        else RelayStatus.TURNED_OFF.name,
                "requestCount": self.request_counter
            }
