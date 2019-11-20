# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

from pkg_resources import parse_version
from kaitaistruct import __version__ as ks_version, KaitaiStruct, KaitaiStream, BytesIO
from enum import Enum


if parse_version(ks_version) < parse_version('0.7'):
    raise Exception("Incompatible Kaitai Struct Python API: 0.7 or later is required, but you have %s" % (ks_version))

class Icp(KaitaiStruct):

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
        self.dst = self._io.read_u1()
        self.src = self._io.read_u1()
        self.len = self._io.read_u1()
        self.cmd = self._root.Command(self._io.read_u1())
        self.uuid = self._io.read_bytes(3)
        self.mode = self._io.read_u1()
        if self.cmd == self._root.Command.beacon_data:
            self._raw_beacon = self._io.read_bytes(self.len)
            io = KaitaiStream(BytesIO(self._raw_beacon))
            self.beacon = self._root.BeaconPacket(io, self, self._root)

        if self.cmd != self._root.Command.beacon_data:
            self.data = self._io.read_bytes(self.len)

        self.crc = self._io.read_u2le()

    class BeaconPacket(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.mode = self._root.BeaconMode(self._io.read_u1())
            if self.mode == self._root.BeaconMode.normal:
                self.normal_payload = self._root.NormalBeaconPacket(self._io, self, self._root)



    class NormalBeaconPacket(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.timestamp = self._io.read_u4le()
            self.main_bus_volt = self._io.read_u1()
            self.avg_power_balance = self._io.read_u1()
            self.bat_a_volt = self._io.read_u1()
            self.bat_b_volt = self._io.read_u1()
            self.bat_c_volt = self._io.read_u1()
            self.bat_d_volt = self._io.read_u1()
            self.bat_a_temp = self._io.read_u1()
            self.bat_b_temp = self._io.read_u1()
            self.bat_c_temp = self._io.read_u1()
            self.bat_d_temp = self._io.read_u1()
            self.spin_rate_z = self._io.read_s2le()
            self.recv_sig_str = self._io.read_s1()
            self.sat_mission_phase = self._io.read_bits_int(2)
            self.time_since_last_reset_obc = self._io.read_bits_int(2)
            self.time_since_last_reset_com = self._io.read_bits_int(2)
            self.time_since_last_reset_eps = self._io.read_bits_int(2)
            self._io.align_to_byte()
            self.tether_current = self._io.read_u1()
            self.time_since_last_error_aoc = self._io.read_bits_int(2)
            self.time_since_last_error_obc = self._io.read_bits_int(2)
            self.time_since_last_error_com = self._io.read_bits_int(2)
            self.time_since_last_error_eps = self._io.read_bits_int(2)
            self._io.align_to_byte()
            self.sys_stat_obc = self._io.read_u1()
            self.sys_stat_eps = self._io.read_u1()
            self.sys_stat_aocs = self._io.read_u1()
            self.sys_stat_com = self._io.read_u1()



