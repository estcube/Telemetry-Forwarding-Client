"""
Module containing the relay for sending the received packets to Mission Control with SIDS.
"""

import logging
import requests
from conf import Configuration
from ax_listener import AXFrame

class SIDSRelay(object):
    """ Class that contains the function for sending the packets. """

    _logger = logging.getLogger(__name__)

    def __init__(self, config: Configuration):
        self.config = config

    def relay(self, frame: AXFrame):
        """ If relaying is enabled, sends the frame to the configured SIDS server. """

        if self.config.get_conf("Mission Control", "relay-enabled") != "True":
            return

        params = {
            "noradID": self.config.get_conf("Mission Control", "norad-id"),
            "source": self.config.get_conf("Mission Control", "receiver-callsign"),
            "timestamp": frame.recv_time,
            "frame": frame.frame.hex(),
            "locator": "longLat",
            "longitude": self.config.get_conf("Mission Control", "longitude"),
            "latitude": self.config.get_conf("Mission Control", "latitude")
        }

        url = self.config.get_conf("Mission Control", "mcs-relay-url")
        r = requests.get(url, params=params)
        self._logger.debug("Sent SIDS relay request to: %s", r.url)
        self._logger.debug("SIDS response: %s", r.text)