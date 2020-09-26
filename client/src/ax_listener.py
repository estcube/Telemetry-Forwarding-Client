"""
Module containing the logic for decoding AX.25 packets.
"""

import logging
from datetime import datetime
from typing import Callable
from conf import Configuration

class AXFrame(object):
    """ Simple data class for holding the decoded data of an AX.25 frame. """
    def __init__(self, dest: str, source: str, repeaters, ctrl: int, pid: int,
                 info: bytearray, frame: bytearray, recv_time: datetime, needs_relay=False):
        self.dest = dest
        self.source = source
        self.repeaters = repeaters
        self.ctrl = ctrl
        self.pid = pid
        self.info = info
        self.frame = frame
        self.recv_time = recv_time
        self.needs_relay = needs_relay

    def __repr__(self):
        return (("Dest: {}; Source: {}; Repeaters: {}; Control: {}; PID: {}; INFO: {};"
                    ).format(self.dest, self.source,
                                      ", ".join([x[0] for x in self.repeaters]),
                                      self.ctrl, self.pid, self.info.hex()
                                      ))

class AXListener(object):
    """
    AX.25 Listener
    Specification: https://tapr.org/pub_ax25.html
    """

    _logger = logging.getLogger(__name__)

    def __init__(self, config: Configuration):
        self.config = config
        self.callbacks = []

    def add_callback(self, callback: Callable) -> int:
        """Adds a callback to the list of functions that are called, when a packet is decoded."""
        if not callable(callback):
            raise ValueError("Cannot add a callback that is not callable.")
        self.callbacks.append(callback)
        return len(self.callbacks) - 1

    def receive(self, frame: bytearray):
        """Handles the receiving of an AX.25 frame and transmitting it in a
        decoded form to all the callbacks."""

        recv_time = datetime.now()

        # Destination and source address parsing.
        (dest, _, is_last) = self.extract_address(frame[:7])
        self._logger.debug("Destination: %s\tIs last: %s", dest, is_last)
        if is_last:
            self._logger.warning("Destination address had the 'last address' bit set.")
            return

        (source, _, is_last) = self.extract_address(frame[7:14])
        self._logger.debug("Source: %s\tIs last: %s", source, is_last)

        # Check if the source of AX25 is from where we want it from
        satellite_src = self.config.get_conf("TNC interface", "satellite-src")
        if source.strip() != str(satellite_src):
            self._logger.warning("Packet not sent from configured SRC (Expected packet from SRC - {}, got packet from SRC - {})".format(satellite_src, source))
            return
        # Repeater address parsing.
        i = 0
        repeaters = []
        while not is_last:
            if i > 7:
                self._logger.warning(
                    "Read 8 repeater addresses without the 'last address' bit set.")
                return
            (addr, ssid, is_last) = self.extract_address(frame[7 * (i+2) : 7 * (i+3)])
            self._logger.debug("Repeater addr: %s\tssid: %s\tIs last: %s", addr, ssid, is_last)
            repeaters.append((addr, ssid))
            i += 1

        # Pointer to the current byte
        byte_pointer = 7 * (i+2)
        # self._logger.debug("Byte pointer: %i", byte_pointer)

        # Control byte
        control = frame[byte_pointer]
        # self._logger.debug("Control frame: %d", control)
        if control & 0x3 != 0x3:
            self._logger.info("Read an AX.25 frame that is not an UI Frame. Discarding..")
            return

        # PID byte
        byte_pointer += 1
        pid = frame[byte_pointer]
        byte_pointer += 1

        # Info
        info_bytes = frame[byte_pointer:]

        needs_relay = bool(self.config.get_conf("Mission Control", "save-unrelayed-packets"))

        # Send Frame obj to callbacks.
        ax_frame = AXFrame(dest, source, repeaters, control, pid, info_bytes, frame,
                           recv_time, needs_relay)
        # self._logger.debug(ax_frame)

        for callback in self.callbacks:
            callback(ax_frame)

    def extract_address(self, frame_part: bytearray) -> (str, int, bool):
        """Reads the address from the given 7-byte array and determines
        if the address is the last one

        Returns a tuple in the form of: (decoded address, SSID byte, is_last)
        """
        if len(frame_part) != 7:
            self._logger.warning("Called extractAddress with invalid length (%d) framePart",
                                 len(frame_part))
            raise ValueError

        # If the last bit of the last byte is 1, the given address is the last one.
        is_last = frame_part[-1] & 0x01 == 0x01

        for i in range(0, 6):
            frame_part[i] = frame_part[i]>>1
        addr = frame_part[:6].decode("ASCII")

        return (addr, frame_part[-1], is_last)
