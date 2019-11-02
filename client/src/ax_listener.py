"""
Module containing the logic for decoding AX.25 packets.
"""

import logging
from datetime import datetime
from typing import Callable
from bitarray import bitarray

class AXFrame(object):
    """
    Simple data class for holding the decoded data of an AX.25 frame.
    """
    def __init__(self, dest: str, source: str, repeaters, ctrl: int, pid: int,
                 info: bytearray, fcs: bytearray, frame: bytearray, recv_time: datetime):
        self.dest = dest
        self.source = source
        self.repeaters = repeaters
        self.ctrl = ctrl
        self.pid = pid
        self.info = info
        self.fcs = fcs
        self.frame = frame
        self.recv_time = recv_time

    def __repr__(self):
        return (("Dest: {}; Source: {}; Repeaters: {}; Control: {}; PID: {}; INFO: {}; "
                 + "FCS: {};").format(self.dest, self.source,
                                      ", ".join([x[0] for x in self.repeaters]),
                                      self.ctrl, self.pid, self.info.hex(), self.fcs.hex()
                                      ))

class AXListener(object):
    """
    AX.25 Listener
    Specification: https://tapr.org/pub_ax25.html
    """

    _logger = logging.getLogger(__name__)

    def __init__(self, clean_frames=False):
        # self.interface = kiss.TCPKISS(IP, PORT, strip_df_start=True)
        # self.interface.start()
        self.callbacks = []
        self.clean_frames = clean_frames

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

        if self.clean_frames:
            clean_frame = self.clean_frame(frame)
        else:
            # Supposedly the TNC outputs clean frames.
            clean_frame = frame[1:-1]

        # Destination and source address parsing.
        (dest, _, is_last) = self.extract_address(clean_frame[:7])
        self._logger.debug("Destination: %s\tIs last: %s", dest, is_last)
        if is_last:
            self._logger.warning("Destination address had the 'last address' bit set.")
            return
        (source, _, is_last) = self.extract_address(clean_frame[7:14])
        self._logger.debug("Source: %s\tIs last: %s", source, is_last)

        # TODO: Check the source is ESTCube-2.

        # Repeater address parsing.
        i = 0
        repeaters = []
        while not is_last:
            if i > 7:
                self._logger.warning(
                    "Read 8 repeater addresses without the 'last address' bit set.")
                return
            (addr, ssid, is_last) = self.extract_address(clean_frame[7 * (i+2) : 7 * (i+3)])
            self._logger.debug("Repeater addr: %s\tssid: %s\tIs last: %s", addr, ssid, is_last)
            repeaters.append((addr, ssid))
            i += 1

        # Pointer to the current byte
        byte_pointer = 7 * (i+2)
        self._logger.debug("Byte pointer: %i", byte_pointer)

        # Control byte
        control = clean_frame[byte_pointer]
        self._logger.debug("Control frame: %d", control)
        if control & 0x3 != 0x3:
            self._logger.info("Read an AX.25 frame that is not an UI Frame. Discarding..")
            return
        byte_pointer += 1

        # PID byte
        pid = clean_frame[byte_pointer]
        byte_pointer += 1

        # Info
        info_bytes = clean_frame[byte_pointer:-2]

        # FCS Control
        fcs = clean_frame[-2:]
        # TODO Implement fcs control

        # Send Frame obj to callbacks.
        ax_frame = AXFrame(dest, source, repeaters, control, pid, info_bytes, fcs, clean_frame,
                           recv_time)
        self._logger.debug(ax_frame)

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


    def clean_frame(self, frame: bytearray) -> bytearray:
        """Removes the extra bits resulting from bitstuffing
        and the bytes marking the start and end of the frame."""
        one_count = 0
        bit_arr = bitarray(endian="little")
        res_arr = bitarray(endian="little")
        bit_arr.frombytes(bytes(frame))
        flag_count = 0

        for i in range(0, len(bit_arr)):
            b = bit_arr[i]

            if b == 1:
                one_count += 1

            if b == 0 and one_count == 5:  # Destuff bits
                one_count = 0
                continue
            elif b == 0 and one_count == 6: # Reached a flag
                flag_count += 1
                if flag_count == 2:
                    if (len(res_arr) - 7) % 8 != 0:
                        self._logger.warning(
                            "Improper amount of bits (%d) between the first two AX.25 "
                            + "flags in the msg (%s).",
                            len(res_arr) - 7, frame)
                        return None
                    return bytearray(res_arr[:-7].tobytes()) # Return without the ending flag bits
                one_count = 0
                continue
            elif b == 0:
                one_count = 0

            if flag_count == 1: # Only return the bits between the two flags.
                res_arr.append(b)

        self._logger.warning("Input (%s) to cleanFrame did not contain a full AX.25 frame.", frame)
        return None
