# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

from pkg_resources import parse_version
from kaitaistruct import __version__ as ks_version, KaitaiStruct, KaitaiStream, BytesIO


if parse_version(ks_version) < parse_version('0.7'):
    raise Exception("Incompatible Kaitai Struct Python API: 0.7 or later is required, but you have %s" % (ks_version))

class Eps(KaitaiStruct):
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.reserved = self._io.read_bits_int(1) != 0
        self.internal_flash = self._io.read_bits_int(1) != 0
        self.internal_sram = self._io.read_bits_int(1) != 0
        self.adc1 = self._io.read_bits_int(1) != 0
        self.adc2 = self._io.read_bits_int(1) != 0
        self.adc3 = self._io.read_bits_int(1) != 0
        self.fram1 = self._io.read_bits_int(1) != 0
        self.fram2 = self._io.read_bits_int(1) != 0
        self.rtc = self._io.read_bits_int(1) != 0
        self.icp0 = self._io.read_bits_int(1) != 0
        self.icp1 = self._io.read_bits_int(1) != 0
        self.reserved2 = self._io.read_bits_int(1) != 0
        self.reserved3 = self._io.read_bits_int(1) != 0
        self.reserved4 = self._io.read_bits_int(1) != 0
        self.reserved5 = self._io.read_bits_int(1) != 0
        self.reserved6 = self._io.read_bits_int(1) != 0
        self.err_mcu = self._io.read_bits_int(1) != 0
        self.err_internal_flash = self._io.read_bits_int(1) != 0
        self.err_internal_sram = self._io.read_bits_int(1) != 0
        self.err_adc1 = self._io.read_bits_int(1) != 0
        self.err_adc2 = self._io.read_bits_int(1) != 0
        self.err_adc3 = self._io.read_bits_int(1) != 0
        self.err_fram1 = self._io.read_bits_int(1) != 0
        self.err_fram2 = self._io.read_bits_int(1) != 0
        self.err_rtc = self._io.read_bits_int(1) != 0
        self.err_icp0 = self._io.read_bits_int(1) != 0
        self.err_icp1 = self._io.read_bits_int(1) != 0
        self.err_reserved1 = self._io.read_bits_int(1) != 0
        self.err_reserved2 = self._io.read_bits_int(1) != 0
        self.err_reserved3 = self._io.read_bits_int(1) != 0
        self.err_reserved4 = self._io.read_bits_int(1) != 0
        self.err_reserved5 = self._io.read_bits_int(1) != 0
        self._io.align_to_byte()
        self.bus_voltage = self._io.read_u2le()
        self.avg_power_balance = self._io.read_s2le()
        self.bat_a = self._io.read_bits_int(1) != 0
        self.bat_b = self._io.read_bits_int(1) != 0
        self.bat_c = self._io.read_bits_int(1) != 0
        self.bat_d = self._io.read_bits_int(1) != 0
        self.bat_reserved1 = self._io.read_bits_int(1) != 0
        self.bat_reserved2 = self._io.read_bits_int(1) != 0
        self.bat_reserved3 = self._io.read_bits_int(1) != 0
        self.bat_reserved4 = self._io.read_bits_int(1) != 0
        self._io.align_to_byte()
        self.bat_curr_a = self._io.read_u2le()
        self.bat_curr_b = self._io.read_u2le()
        self.bat_curr_c = self._io.read_u2le()
        self.bat_curr_d = self._io.read_u2le()
        self.bat_volt_a = self._io.read_u2le()
        self.bat_volt_b = self._io.read_u2le()
        self.bat_volt_c = self._io.read_u2le()
        self.bat_volt_d = self._io.read_u2le()
        self.bat_temp_a = self._io.read_u2le()
        self.bat_temp_b = self._io.read_u2le()
        self.bat_temp_c = self._io.read_u2le()
        self.bat_temp_d = self._io.read_u2le()
        self.obc_curr_cons = self._io.read_u2le()
        self.com_curr_cons = self._io.read_u2le()
        self.eps_curr_cons = self._io.read_u2le()
        self.st_curr_const = self._io.read_u2le()
        self.x_plus_curr_cons = self._io.read_u2le()
        self.x_minus_curr_cons = self._io.read_u2le()
        self.y_plus_curr_cons = self._io.read_u2le()
        self.y_minus_curr_cons = self._io.read_u2le()
        self.z_plus_curr_cons = self._io.read_u2le()
        self.z_minus_curr_cons = self._io.read_u2le()
        self.cdp_curr_cons = self._io.read_u2le()
        self.cam_curr_cons = self._io.read_u2le()
        self.hscom_curr_cons = self._io.read_u2le()
        self.cre_curr_cons = self._io.read_u2le()
        self.cgp_curr_cons = self._io.read_u2le()


