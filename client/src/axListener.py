import logging
import kiss
from typing import Callable
from bitarray import bitarray

class AXFrame(object):
    def __init__(self, dest: str, source: str, repeaters, ctrl: int, pid: int, info: bytearray, fcs: bytearray, frame: bytearray):
        self.dest = dest
        self.source = source
        self.repeaters = repeaters
        self.ctrl = ctrl
        self.pid = pid
        self.info = info
        self.fcs = fcs
        self.frame = frame

    def __repr__(self):
        return "Dest: {}; Source: {}; Repeaters: {}; Control: {}; PID: {}; INFO: {}; FCS: {};".format(
            self.dest, self.source, ", ".join([x[0] for x in self.repeaters]), self.ctrl, self.pid, self.info.hex(), self.fcs.hex()
        )

class AXListener(object):
    """
    AX.25 Listener
    Specification: https://tapr.org/pub_ax25.html
    """

    _logger = logging.getLogger(__name__)

    def __init__(self):
        # self.interface = kiss.TCPKISS(IP, PORT, strip_df_start=True)
        # self.interface.start()
        self.callbacks = []

    def addCallback(self, callback: Callable) -> int:
        if not callable(callback):
            raise ValueError("Cannot add a callback that is not callable.")
        self.callbacks.append(callback)
        return len(self.callbacks) - 1

    def listen(self):
        pass

    def receive(self, frame: bytearray):
        # TODO: Should we log and send a clean or unclean frame?

        f = self.cleanFrame(frame)

        # Destination and source address parsing.
        (dest, _, isLast) = self.extractAddress(f[:7])
        if isLast:
            self._logger.warning("Destination address had the 'last address' bit set.")
            return
        (source, _, isLast) = self.extractAddress(f[7:14])

        # TODO: Check the source is ESTCube-2.

        # Repeater address parsing.
        i = 0
        repeaters = []
        while not isLast:
            if i > 7:
                self._logger.warning("Read 8 repeater addresses without the 'last address' bit set.")
                return
            (r, s, isLast) = self.extractAddress(f[7 * (i+2) : 7 * (i+3)])
            repeaters.append((r, s))
            i += 1

        # Pointer to the current byte
        byteP = 7 * (i+2)

        # Control byte
        control = f[byteP]
        if control & 0x3 != 0x3:
            self._logger.debug("Read an AX.25 frame that is not an UI Frame. Discarding..")
            return
        byteP += 1

        # PID byte
        pid = f[byteP]
        byteP += 1

        # Info
        infoBytes = f[byteP:-2]
        try:
            self._logger.debug("Information bytes ({}) decoded: {}".format(infoBytes.hex(), infoBytes.decode('utf-8')))
        except:
            self._logger.debug("Failed to decode bytes: {}".format(infoBytes.hex()))

        # FCS Control
        fcs = f[-2:]
        # TODO

        # Send Frame obj to callbacks.
        axFrame = AXFrame(dest, source, repeaters, control, pid, infoBytes, fcs, f)
        self._logger.debug(axFrame)

        for callback in self.callbacks:
            callback(axFrame)

    def extractAddress(self, framePart: bytearray) -> (str, int, bool):
        if len(framePart) != 7:
            self._logger.warn("Called extractAddress with invalid length (%d) framePart", len(framePart))
            raise ValueError

        # If the last bit of the last byte is 1, the given address is the last one.
        isLast = framePart[-1] & 0x01 == 0x01

        for i in range(0, 6):
            framePart[i] = framePart[i]>>1
        addr = framePart[:6].decode("ASCII")

        return (addr, framePart[-1], isLast)


    def cleanFrame(self, frame: bytearray) -> bytearray:
        oneCount = 0
        bitArr = bitarray(endian="little")
        resArr = bitarray(endian="little")
        bitArr.frombytes(bytes(frame))
        flagCount = 0

        for i in range(0, len(bitArr)):
            b = bitArr[i]

            if b == 1:
                oneCount += 1

            if b == 0 and oneCount == 5:  # Destuff bits
                oneCount = 0
                continue
            elif b == 0 and oneCount == 6: # Reached a flag
                flagCount += 1
                if flagCount == 2:
                    if (len(resArr) - 7) % 8 != 0:
                        self._logger.warning("Improper amount of bits (%d) between the first two AX.25 flags in the msg (%s).",
                                len(resArr) - 7, frame)
                        return None
                    return bytearray(resArr[:-7].tobytes()) # Return without the ending flag bits
                oneCount = 0
                continue
            elif b == 0:
                oneCount = 0

            if flagCount == 1: # Only return the bits between the two flags.
                resArr.append(b)

        self._logger.warning("Input (%s) to cleanFrame did not contain a full AX.25 frame.", frame)
        return None

def main():
    pass
    # IP = "localhost"
    # PORT = 3030

    # # frame = b'~\xa8\x8a\x98@@@`\x8a\xa6\xa8\x86\xaa\x84`\x03\xf0\x10\x1eiN+K\x92*\xcf\x07\xfc\x00'
    # # The FCS values might not be correct.
    # frame = b'~\xa8\x8a\x98\x8a\x9a\x8a`\x8a\xa6\xa8\x86\xaa\x84`\x03\xf0Telemetry data: \xcf\x07\xfc\x00'

    # logging.basicConfig(level=logging.DEBUG)
    # l = AXListener()
    # print("Unclean frame: ", bytearray(frame))
    # print("Cleaned frame: ", l.cleanFrame(bytearray(frame)))
    # l.receive(bytearray(frame))

    # clean = l.cleanFrame(bytearray(frame))
    # i = 0
    # isLast = False
    # while not isLast:
    #     a = clean[7 * i : 7 * (i+1)]
    #     isLast = a[-1] & 0x01 == 0x01
    #     print(a.hex(), end="  ")
    #     i += 1
    # bP = 7*i
    # print(hex(clean[bP]), end="  ")
    # bP += 1
    # print(hex(clean[bP]), end="  ")
    # bP += 1
    # print(clean[bP: -2].hex(), end="  ")
    # print(clean[-2:].hex(), end="  ")


if __name__ == "__main__":
    main()