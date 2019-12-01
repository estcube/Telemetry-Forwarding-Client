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
        _on = self.cmd
        if _on == self._root.Command.beacon_data:
            self.data = self._root.BeaconPacket(self._io, self, self._root)
        else:
            self.data = self._root.DataBlob(self._io, self, self._root)
        self.crc = self._io.read_u2le()

    class DataBlob(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.data = self._io.read_bytes(self._parent.len)


    class BeaconPacket(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.mode = self._root.BeaconMode(self._io.read_u1())
            _on = self.mode
            if _on == self._root.BeaconMode.normal:
                self.payload = self._root.BeaconPayloadNormal(self._io, self, self._root)
            elif _on == self._root.BeaconMode.safe:
                self.payload = self._root.BeaconPayloadSafe(self._io, self, self._root)


    class BeaconPayloadNormal(KaitaiStruct):
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

        @property
        def spin_rate_z_calc(self):
            if hasattr(self, '_m_spin_rate_z_calc'):
                return self._m_spin_rate_z_calc if hasattr(self, '_m_spin_rate_z_calc') else None

            self._m_spin_rate_z_calc = (self.spin_rate_z * 720) // 2047
            return self._m_spin_rate_z_calc if hasattr(self, '_m_spin_rate_z_calc') else None

        @property
        def tether_current_calc(self):
            if hasattr(self, '_m_tether_current_calc'):
                return self._m_tether_current_calc if hasattr(self, '_m_tether_current_calc') else None

            self._m_tether_current_calc = (self.tether_current * 5) // 255
            return self._m_tether_current_calc if hasattr(self, '_m_tether_current_calc') else None


    class BeaconPayloadSafe(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.timestamp = self._io.read_u4le()
            self.err_code_1 = self._io.read_u1()
            self.err_code_2 = self._io.read_u1()
            self.err_code_3 = self._io.read_u1()
            self.time_safemode = self._io.read_u2le()
            self.main_bus_volt = self._io.read_u1()
            self.status_obc = self._io.read_bits_int(1) != 0
            self.status_obc_bsw = self._io.read_bits_int(1) != 0
            self.status_com_3v3 = self._io.read_bits_int(1) != 0
            self.status_pl_3v3 = self._io.read_bits_int(1) != 0
            self.status_pl_5v = self._io.read_bits_int(1) != 0
            self.status_cam = self._io.read_bits_int(1) != 0
            self.status_aocs = self._io.read_bits_int(1) != 0
            self.status_st = self._io.read_bits_int(1) != 0
            self.status_bat_a_charging = self._io.read_bits_int(1) != 0
            self.status_bat_a_discharging = self._io.read_bits_int(1) != 0
            self.status_bat_b_charging = self._io.read_bits_int(1) != 0
            self.status_bat_b_discharging = self._io.read_bits_int(1) != 0
            self.status_bat_c_charging = self._io.read_bits_int(1) != 0
            self.status_bat_c_discharging = self._io.read_bits_int(1) != 0
            self.status_bat_d_charging = self._io.read_bits_int(1) != 0
            self.status_bat_d_discharging = self._io.read_bits_int(1) != 0
            self.status_spb_a_reg = self._io.read_bits_int(1) != 0
            self.status_spb_b_reg = self._io.read_bits_int(1) != 0
            self.status_3v3_a_reg = self._io.read_bits_int(1) != 0
            self.status_3v3_b_reg = self._io.read_bits_int(1) != 0
            self.status_5v_a_reg = self._io.read_bits_int(1) != 0
            self.status_5v_b_reg = self._io.read_bits_int(1) != 0
            self.status_12v_a_reg = self._io.read_bits_int(1) != 0
            self.status_12v_b_reg = self._io.read_bits_int(1) != 0
            self._io.align_to_byte()
            self.bat_a_volt = self._io.read_u1()
            self.bat_b_volt = self._io.read_u1()
            self.bat_c_volt = self._io.read_u1()
            self.bat_d_volt = self._io.read_u1()
            self.bat_a_temp = self._io.read_u1()
            self.bat_b_temp = self._io.read_u1()
            self.bat_c_temp = self._io.read_u1()
            self.bat_d_temp = self._io.read_u1()
            self.power_balance = self._io.read_s1()
            self.firmware_version = self._io.read_u1()
            self.crash_counter = self._io.read_u1()
            self.forwarded_rf_pow = self._io.read_s1()
            self.reflected_rf_pow = self._io.read_s1()
            self.received_sig_str = self._io.read_s1()



