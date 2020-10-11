# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

from pkg_resources import parse_version
from kaitaistruct import __version__ as ks_version, KaitaiStruct, KaitaiStream, BytesIO
from enum import Enum


if parse_version(ks_version) < parse_version('0.7'):
    raise Exception("Incompatible Kaitai Struct Python API: 0.7 or later is required, but you have %s" % (ks_version))

class Aocs(KaitaiStruct):

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
        self.bmg160_gyro_x = self._io.read_bytes(2)
        self.bmg160_gyro_y = self._io.read_bytes(2)
        self.bmg160_gyro_z = self._io.read_bytes(2)
        self.lis3mdl_magnet_x = self._io.read_bytes(2)
        self.lis3mdl_magnet_y = self._io.read_bytes(2)
        self.lis3mdl_magnet_z = self._io.read_bytes(2)
        self.sun_x_intensity = self._io.read_u2le()
        self.sun_x_intensity_loc = self._io.read_u2le()
        self.sun_y_intensity = self._io.read_u2le()
        self.sun_y_intensity_loc = self._io.read_u2le()
        self.mcp9808_temp = self._io.read_u1()
        self.pointing = self._io.read_bits_int(1) != 0
        self.detumbling = self._io.read_bits_int(1) != 0
        self.spin_up = self._io.read_bits_int(1) != 0
        self.diagnostics = self._io.read_bits_int(1) != 0
        self.custom = self._io.read_bits_int(1) != 0
        self.reserved = self._io.read_bits_int(1) != 0
        self.low_precision = self._io.read_bits_int(1) != 0
        self.high_precision = self._io.read_bits_int(1) != 0
        self._io.align_to_byte()
        self.reaction_wheel1 = self._io.read_bytes(2)
        self.reaction_wheel2 = self._io.read_bytes(2)
        self.reaction_wheel3 = self._io.read_bytes(2)


