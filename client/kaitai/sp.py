# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

from pkg_resources import parse_version
from kaitaistruct import __version__ as ks_version, KaitaiStruct, KaitaiStream, BytesIO
from enum import Enum


if parse_version(ks_version) < parse_version('0.7'):
    raise Exception("Incompatible Kaitai Struct Python API: 0.7 or later is required, but you have %s" % (ks_version))

class Sp(KaitaiStruct):

    class Command(Enum):
        beacon_data = 247

    class BeaconMode(Enum):
        normal = 78
        safe = 83
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.reserved = self._io.read_bits_int(1) != 0
        self.internal_flash = self._io.read_bits_int(1) != 0
        self.internal_sram = self._io.read_bits_int(1) != 0
        self.sunsensor = self._io.read_bits_int(1) != 0
        self.fram1 = self._io.read_bits_int(1) != 0
        self.fram2 = self._io.read_bits_int(1) != 0
        self.icp0 = self._io.read_bits_int(1) != 0
        self.mag = self._io.read_bits_int(1) != 0
        self.temp = self._io.read_bits_int(1) != 0
        self.mppt = self._io.read_bits_int(1) != 0
        self.coil = self._io.read_bits_int(1) != 0
        self.reserved1 = self._io.read_bits_int(1) != 0
        self.reserved2 = self._io.read_bits_int(1) != 0
        self.err_mcu = self._io.read_bits_int(1) != 0
        self.err_internal_flash = self._io.read_bits_int(1) != 0
        self.err_internal_sram = self._io.read_bits_int(1) != 0
        self.err_sunsensor = self._io.read_bits_int(1) != 0
        self.err_fram1 = self._io.read_bits_int(1) != 0
        self.err_fram2 = self._io.read_bits_int(1) != 0
        self.err_icp0 = self._io.read_bits_int(1) != 0
        self.err_mag = self._io.read_bits_int(1) != 0
        self.err_temp = self._io.read_bits_int(1) != 0
        self.err_mppt = self._io.read_bits_int(1) != 0
        self.err_coil = self._io.read_bits_int(1) != 0
        self.err_reserved1 = self._io.read_bits_int(1) != 0
        self.err_reserved2 = self._io.read_bits_int(1) != 0
        self._io.align_to_byte()
        self.temp_curr = self._io.read_u1()
        self.mppt_curr = self._io.read_u2le()
        self.coil_curr = self._io.read_u2le()


