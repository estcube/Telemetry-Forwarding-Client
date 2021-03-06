# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

from pkg_resources import parse_version
from kaitaistruct import __version__ as ks_version, KaitaiStruct, KaitaiStream, BytesIO


if parse_version(ks_version) < parse_version('0.7'):
    raise Exception("Incompatible Kaitai Struct Python API: 0.7 or later is required, but you have %s" % (ks_version))

class Scom(KaitaiStruct):
    def __init__(self, _io, _parent=None, _root=None):
        self._io = _io
        self._parent = _parent
        self._root = _root if _root else self
        self._read()

    def _read(self):
        self.scom_reserved = self._io.read_bits_int(1) != 0
        self.scom_internal_flash = self._io.read_bits_int(1) != 0
        self.scom_internal_sram = self._io.read_bits_int(1) != 0
        self.scom_qspi_fram = self._io.read_bits_int(1) != 0
        self.scom_spi_fram = self._io.read_bits_int(1) != 0
        self.scom_transceiver = self._io.read_bits_int(1) != 0
        self.scom_dac = self._io.read_bits_int(1) != 0
        self.scom_icp2 = self._io.read_bits_int(1) != 0
        self.scom_oscillator = self._io.read_bits_int(1) != 0
        self.scom_temp1 = self._io.read_bits_int(1) != 0
        self.scom_temp2 = self._io.read_bits_int(1) != 0
        self.scom_reserved2 = self._io.read_bits_int(1) != 0
        self.scom_reserved3 = self._io.read_bits_int(1) != 0
        self.scom_reserved4 = self._io.read_bits_int(1) != 0
        self.scom_reserved5 = self._io.read_bits_int(1) != 0
        self.scom_reserved6 = self._io.read_bits_int(1) != 0
        self.scom_err_mcu = self._io.read_bits_int(1) != 0
        self.scom_err_internal_flash = self._io.read_bits_int(1) != 0
        self.scom_err_internal_sram = self._io.read_bits_int(1) != 0
        self.scom_err_qspi_fram = self._io.read_bits_int(1) != 0
        self.scom_err_spi_fram = self._io.read_bits_int(1) != 0
        self.scom_err_transceiver = self._io.read_bits_int(1) != 0
        self.scom_err_dac = self._io.read_bits_int(1) != 0
        self.scom_err_icp2 = self._io.read_bits_int(1) != 0
        self.scom_err_oscillator = self._io.read_bits_int(1) != 0
        self.scom_err_temp1 = self._io.read_bits_int(1) != 0
        self.scom_err_temp2 = self._io.read_bits_int(1) != 0
        self.scom_err_reserved1 = self._io.read_bits_int(1) != 0
        self.scom_err_reserved2 = self._io.read_bits_int(1) != 0
        self.scom_err_reserved3 = self._io.read_bits_int(1) != 0
        self.scom_err_reserved4 = self._io.read_bits_int(1) != 0
        self.scom_err_reserved5 = self._io.read_bits_int(1) != 0
        self._io.align_to_byte()
        self.scom_signal_stre = self._io.read_u1()
        self.scom_last_packet_time = self._io.read_bits_int(31)
        self.scom_last_packet_bool = self._io.read_bits_int(1) != 0
        self._io.align_to_byte()
        self.scom_dropped_packets = self._io.read_u4le()
        self.scom_gs_packets = self._io.read_u4le()
        self.scom_sent_packets = self._io.read_u4le()
        self.scom_digipeated_packets = self._io.read_u4le()
        self.scom_power_amp_temp = self._io.read_u1()
        self.scom_forward_rf_power = self._io.read_s1()
        self.scom_reflected_rf_power = self._io.read_s1()


