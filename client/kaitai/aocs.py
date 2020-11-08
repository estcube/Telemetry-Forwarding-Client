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

        self.bmg160_gyro_x = self._io.read_s2le()
        self.bmg160_gyro_y = self._io.read_s2le()
        self.bmg160_gyro_z = self._io.read_s2le()
        self.lis3mdl_magnet_x = self._io.read_s2le()
        self.lis3mdl_magnet_y = self._io.read_s2le()
        self.lis3mdl_magnet_z = self._io.read_s2le()
        self.sun_x_intensity1 = self._io.read_u2le()
        self.sun_x_intensity2 = self._io.read_u2le()
        self.sun_x_intensity3 = self._io.read_u2le()
        self.sun_x_intensity4 = self._io.read_u2le()
        self.sun_x_intensity5 = self._io.read_u2le()
        self.sun_x_intensity6 = self._io.read_u2le()
        self.sun_x_intensity_loc1 = self._io.read_u2le()
        self.sun_x_intensity_loc2 = self._io.read_u2le()
        self.sun_x_intensity_loc3 = self._io.read_u2le()
        self.sun_x_intensity_loc4 = self._io.read_u2le()
        self.sun_x_intensity_loc5 = self._io.read_u2le()
        self.sun_x_intensity_loc6 = self._io.read_u2le()
        self.sun_y_intensity1 = self._io.read_u2le()
        self.sun_y_intensity2 = self._io.read_u2le()
        self.sun_y_intensity3 = self._io.read_u2le()
        self.sun_y_intensity4 = self._io.read_u2le()
        self.sun_y_intensity5 = self._io.read_u2le()
        self.sun_y_intensity6 = self._io.read_u2le()
        self.sun_y_intensity_loc1 = self._io.read_u2le()
        self.sun_y_intensity_loc2 = self._io.read_u2le()
        self.sun_y_intensity_loc3 = self._io.read_u2le()
        self.sun_y_intensity_loc4 = self._io.read_u2le()
        self.sun_y_intensity_loc5 = self._io.read_u2le()
        self.sun_y_intensity_loc6 = self._io.read_u2le()
        self.mcp9808_temp1 = self._io.read_u1()
        self.mcp9808_temp2 = self._io.read_u1()
        self.pointing = self._io.read_bits_int(1) != 0
        self.detumbling = self._io.read_bits_int(1) != 0
        self.spin_up = self._io.read_bits_int(1) != 0
        self.diagnostics = self._io.read_bits_int(1) != 0
        self.custom = self._io.read_bits_int(1) != 0
        self.reserved = self._io.read_bits_int(1) != 0
        self.low_precision = self._io.read_bits_int(1) != 0
        self.high_precision = self._io.read_bits_int(1) != 0
        self._io.align_to_byte()
        self.reaction_wheel1 = self._io.read_s2le()
        self.reaction_wheel2 = self._io.read_s2le()
        self.reaction_wheel3 = self._io.read_s2le()


