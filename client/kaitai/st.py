# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

from pkg_resources import parse_version
from kaitaistruct import __version__ as ks_version, KaitaiStruct, KaitaiStream, BytesIO


if parse_version(ks_version) < parse_version('0.7'):
    raise Exception("Incompatible Kaitai Struct Python API: 0.7 or later is required, but you have %s" % (ks_version))

class St(KaitaiStruct):
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.reserved = self._io.read_bits_int(1) != 0
        self.internal_flash = self._io.read_bits_int(1) != 0
        self.internal_sram = self._io.read_bits_int(1) != 0
        self.camera = self._io.read_bits_int(1) != 0
        self.fpga = self._io.read_bits_int(1) != 0
        self.spi_fram = self._io.read_bits_int(1) != 0
        self.spi_flash = self._io.read_bits_int(1) != 0
        self.sdram = self._io.read_bits_int(1) != 0
        self.temp_sensor = self._io.read_bits_int(1) != 0
        self.reserved1 = self._io.read_bits_int(1) != 0
        self.reserved2 = self._io.read_bits_int(1) != 0
        self.reserved3 = self._io.read_bits_int(1) != 0
        self.reserved4 = self._io.read_bits_int(1) != 0
        self.reserved5 = self._io.read_bits_int(1) != 0
        self.reserved6 = self._io.read_bits_int(1) != 0
        self.reserved7 = self._io.read_bits_int(1) != 0
        self.err_mcu = self._io.read_bits_int(1) != 0
        self.err_internal_flash = self._io.read_bits_int(1) != 0
        self.err_internal_sram = self._io.read_bits_int(1) != 0
        self.err_camera = self._io.read_bits_int(1) != 0
        self.err_fpga = self._io.read_bits_int(1) != 0
        self.err_spi_fram = self._io.read_bits_int(1) != 0
        self.err_spi_flash = self._io.read_bits_int(1) != 0
        self.err_sdram = self._io.read_bits_int(1) != 0
        self.err_temp_sensor = self._io.read_bits_int(1) != 0
        self.err_reserved1 = self._io.read_bits_int(1) != 0
        self.err_reserved2 = self._io.read_bits_int(1) != 0
        self.err_reserved3 = self._io.read_bits_int(1) != 0
        self.err_reserved4 = self._io.read_bits_int(1) != 0
        self.err_reserved5 = self._io.read_bits_int(1) != 0
        self.err_reserved6 = self._io.read_bits_int(1) != 0
        self.err_reserved7 = self._io.read_bits_int(1) != 0
        self._io.align_to_byte()
        self.fpga_temp = self._io.read_u2le()
        self.sensor_temp = self._io.read_u2le()


