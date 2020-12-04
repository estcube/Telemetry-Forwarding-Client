# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

from pkg_resources import parse_version
from kaitaistruct import __version__ as ks_version, KaitaiStruct, KaitaiStream, BytesIO


if parse_version(ks_version) < parse_version('0.7'):
    raise Exception("Incompatible Kaitai Struct Python API: 0.7 or later is required, but you have %s" % (ks_version))

class Pcom(KaitaiStruct):
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.pcom_reserved1 = self._io.read_bits_int(1) != 0
        self.pcom_internal_flash = self._io.read_bits_int(1) != 0
        self.pcom_internal_sram = self._io.read_bits_int(1) != 0
        self.pcom_qspi_fram = self._io.read_bits_int(1) != 0
        self.pcom_spi_fram = self._io.read_bits_int(1) != 0
        self.pcom_transceiver = self._io.read_bits_int(1) != 0
        self.pcom_dac = self._io.read_bits_int(1) != 0
        self.pcom_icp0 = self._io.read_bits_int(1) != 0
        self.pcom_icp1 = self._io.read_bits_int(1) != 0
        self.pcom_icp2 = self._io.read_bits_int(1) != 0
        self.pcom_oscillator = self._io.read_bits_int(1) != 0
        self.pcom_temp1 = self._io.read_bits_int(1) != 0
        self.pcom_temp2 = self._io.read_bits_int(1) != 0
        self.pcom_reserved2 = self._io.read_bits_int(1) != 0
        self.pcom_reserved3 = self._io.read_bits_int(1) != 0
        self.pcom_reserved4 = self._io.read_bits_int(1) != 0
        self.pcom_err_mcu = self._io.read_bits_int(1) != 0
        self.pcom_err_internal_flash = self._io.read_bits_int(1) != 0
        self.pcom_err_internal_sram = self._io.read_bits_int(1) != 0
        self.pcom_err_qspi_fram = self._io.read_bits_int(1) != 0
        self.pcom_err_spi_fram = self._io.read_bits_int(1) != 0
        self.pcom_err_transceiver = self._io.read_bits_int(1) != 0
        self.pcom_err_dac = self._io.read_bits_int(1) != 0
        self.pcom_err_icp0 = self._io.read_bits_int(1) != 0
        self.pcom_err_icp1 = self._io.read_bits_int(1) != 0
        self.pcom_err_icp2 = self._io.read_bits_int(1) != 0
        self.pcom_err_oscillator = self._io.read_bits_int(1) != 0
        self.pcom_err_temp1 = self._io.read_bits_int(1) != 0
        self.pcom_err_temp2 = self._io.read_bits_int(1) != 0
        self.pcom_err_reserved1 = self._io.read_bits_int(1) != 0
        self.pcom_err_reserved2 = self._io.read_bits_int(1) != 0
        self.pcom_err_reserved3 = self._io.read_bits_int(1) != 0
        self._io.align_to_byte()
        self.pcom_signal_stre = self._io.read_u1()
        self.pcom_last_packet_time = self._io.read_bits_int(31)
        self.pcom_last_packet_bool = self._io.read_bits_int(1) != 0
        self._io.align_to_byte()
        self.pcom_dropped_packets = self._io.read_u4le()
        self.pcom_gs_packets = self._io.read_u4le()
        self.pcom_sent_packets = self._io.read_u4le()
        self.pcom_power_amp_temp = self._io.read_u1()
        self.pcom_forward_rf_power = self._io.read_s1()
        self.pcom_reflected_rf_power = self._io.read_s1()
        self.pcom_temp_curr_1 = self._io.read_u1()
        self.pcom_temp_curr_2 = self._io.read_u1()


