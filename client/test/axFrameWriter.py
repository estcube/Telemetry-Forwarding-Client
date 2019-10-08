import bitarray
import typing
import struct

class FrameBuilder(object):

    def __init__(self):
        self.source = b"      "
        self.dest = b"      "
        self.source = b"      "

    def setInfo(self, info: typing.Union[str, bytes]):
        if isinstance(info, str):
            self.info = info.encode("utf-8")
        else:
            self.info = info

    def setDest(self, dest: typing.Union[str, bytes]):
        if isinstance(dest, str):
            dest = dest.ljust(6, " ")
            self.dest = dest[:6].encode("ascii")
        else:
            dest = dest.ljust(6, b" ")
            self.dest = dest[:6]

    def setSource(self, source: typing.Union[str, bytes]):
        if isinstance(source, str):
            source = source.ljust(6, " ")
            self.source = source[:6].encode("ascii")
        else:
            source = source.ljust(6, b" ")
            self.source = source[:6]

    def build(self):
        f = bytearray()
        for b in self.dest:
            f.append(b << 1)
        # f.append(0x00)
        f.append(0x60)
        for b in self.source:
            f.append(b << 1)
        # f.append(0x01)
        f.append(0x77)
        f.append(0x03)
        f.append(0xF0)
        f += self.info
        print("FCS: {}".format(self.calc_crc(f)))
        f += self.calc_crc(f)

        return f

    def calc_crc(self, bytes):
        # FIXME: This might not be correct.
        reversed = 0x8404
        fcs = 0xFFFF
        for byte in bytes:
            for i in range(0, 8, 1):
                bit = byte & (1 << i) != 0
                ch = fcs & 0x01 == 1
                fcs >>= 1
                if ch != bit:
                    fcs ^= reversed
        return struct.pack("<H", ~fcs % pow(2, 16))

def main():
    b = FrameBuilder()
    # b.setDest("TELEM")
    # b.setSource("ESTCUB")
    # b.setInfo("Telemetry Data 509")
    a = b.build()
    print(a.hex())

if __name__ == "__main__":
    main()
