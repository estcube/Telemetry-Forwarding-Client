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
        self.reserved1 = self._io.read_bits_int(1) != 0
        self.internal_flash = self._io.read_bits_int(1) != 0
        self.internal_sram = self._io.read_bits_int(1) != 0
        self.qspi_fram = self._io.read_bits_int(1) != 0
        self.spi_fram = self._io.read_bits_int(1) != 0
        self.transceiver = self._io.read_bits_int(1) != 0
        self.dac = self._io.read_bits_int(1) != 0
        self.icp0 = self._io.read_bits_int(1) != 0
        self.icp1 = self._io.read_bits_int(1) != 0
        self.icp2 = self._io.read_bits_int(1) != 0
        self.oscillator = self._io.read_bits_int(1) != 0
        self.temp1 = self._io.read_bits_int(1) != 0
        self.temp2 = self._io.read_bits_int(1) != 0
        self.reserved2 = self._io.read_bits_int(1) != 0
        self.reserved3 = self._io.read_bits_int(1) != 0
        self.reserved4 = self._io.read_bits_int(1) != 0
        self.err_mcu = self._io.read_bits_int(1) != 0
        self.err_internal_flash = self._io.read_bits_int(1) != 0
        self.err_internal_sram = self._io.read_bits_int(1) != 0
        self.err_qspi_fram = self._io.read_bits_int(1) != 0
        self.err_spi_fram = self._io.read_bits_int(1) != 0
        self.err_transceiver = self._io.read_bits_int(1) != 0
        self.err_dac = self._io.read_bits_int(1) != 0
        self.err_icp0 = self._io.read_bits_int(1) != 0
        self.err_icp1 = self._io.read_bits_int(1) != 0
        self.err_icp2 = self._io.read_bits_int(1) != 0
        self.err_oscillator = self._io.read_bits_int(1) != 0
        self.err_temp1 = self._io.read_bits_int(1) != 0
        self.err_temp2 = self._io.read_bits_int(1) != 0
        self.err_reserved1 = self._io.read_bits_int(1) != 0
        self.err_reserved2 = self._io.read_bits_int(1) != 0
        self.err_reserved3 = self._io.read_bits_int(1) != 0
        self._io.align_to_byte()
        self.signal_stre = self._io.read_u1()
        self.last_packet_time = self._io.read_bits_int(31)
        self.last_packet_bool = self._io.read_bits_int(1) != 0
        self._io.align_to_byte()
        self.dropped_packets = self._io.read_u4le()
        self.gs_packets = self._io.read_u4le()
        self.sent_packets = self._io.read_u4le()
        self.power_amp_temp = self._io.read_u1()
        self.forward_rf_power = self._io.read_s1()
        self.reflected_rf_power = self._io.read_s1()
        self.temp_curr_1 = self._io.read_u1()
        self.temp_curr_2 = self._io.read_u1()


