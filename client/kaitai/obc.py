# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

from pkg_resources import parse_version
from kaitaistruct import __version__ as ks_version, KaitaiStruct, KaitaiStream, BytesIO
from enum import Enum


if parse_version(ks_version) < parse_version('0.7'):
    raise Exception("Incompatible Kaitai Struct Python API: 0.7 or later is required, but you have %s" % (ks_version))

class Obc(KaitaiStruct):

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
        self.qspi_flash1 = self._io.read_bits_int(1) != 0
        self.qspi_flash2 = self._io.read_bits_int(1) != 0
        self.fmc_mram = self._io.read_bits_int(1) != 0
        self.spi_fram1 = self._io.read_bits_int(1) != 0
        self.spi_fram2 = self._io.read_bits_int(1) != 0
        self.spi_fram3 = self._io.read_bits_int(1) != 0
        self.io_expander = self._io.read_bits_int(1) != 0
        self.fmc_mram_temp_sensor = self._io.read_bits_int(1) != 0
        self.qspi_flash_temp_sensor = self._io.read_bits_int(1) != 0
        self.io_expander_temp_sensor = self._io.read_bits_int(1) != 0
        self.rtc = self._io.read_bits_int(1) != 0
        self.current_adc = self._io.read_bits_int(1) != 0
        self.aocs1_gyro1 = self._io.read_bits_int(1) != 0
        self.aocs1_gyro2 = self._io.read_bits_int(1) != 0
        self.aocs1_magnet = self._io.read_bits_int(1) != 0
        self.aocs1_acc = self._io.read_bits_int(1) != 0
        self.aocs1_temp = self._io.read_bits_int(1) != 0
        self.aocs2_gyro1 = self._io.read_bits_int(1) != 0
        self.aocs2_gyro2 = self._io.read_bits_int(1) != 0
        self.aocs2_magnet = self._io.read_bits_int(1) != 0
        self.aocs2_acc = self._io.read_bits_int(1) != 0
        self.aocs2_temp = self._io.read_bits_int(1) != 0
        self.payload_bus = self._io.read_bits_int(1) != 0
        self.icp1_bus = self._io.read_bits_int(1) != 0
        self.icp2_bus = self._io.read_bits_int(1) != 0
        self.reaction1 = self._io.read_bits_int(1) != 0
        self.reaction2 = self._io.read_bits_int(1) != 0
        self.reaction3 = self._io.read_bits_int(1) != 0
        self.oscillator = self._io.read_bits_int(1) != 0
        self.err_mcu = self._io.read_bits_int(1) != 0
        self.err_internal_flash = self._io.read_bits_int(1) != 0
        self.err_internal_sram = self._io.read_bits_int(1) != 0
        self.err_qspi_flash1 = self._io.read_bits_int(1) != 0
        self.err_qspi_flash2 = self._io.read_bits_int(1) != 0
        self.err_fmc_mram = self._io.read_bits_int(1) != 0
        self.err_spi_fram1 = self._io.read_bits_int(1) != 0
        self.err_spi_fram2 = self._io.read_bits_int(1) != 0
        self.err_spi_fram3 = self._io.read_bits_int(1) != 0
        self.err_io_expander = self._io.read_bits_int(1) != 0
        self.err_mram_temp = self._io.read_bits_int(1) != 0
        self.err_qspi_flash_temp = self._io.read_bits_int(1) != 0
        self.err_io_expander_temp = self._io.read_bits_int(1) != 0
        self.err_rtc = self._io.read_bits_int(1) != 0
        self.err_current_adc = self._io.read_bits_int(1) != 0
        self.err_aocs1_gyro1 = self._io.read_bits_int(1) != 0
        self.err_aocs1_gyro2 = self._io.read_bits_int(1) != 0
        self.err_aocs1_magnet = self._io.read_bits_int(1) != 0
        self.err_aocs1_acc = self._io.read_bits_int(1) != 0
        self.err_aocs1_temp = self._io.read_bits_int(1) != 0
        self.err_aocs2_gyro1 = self._io.read_bits_int(1) != 0
        self.err_aocs2_gyro2 = self._io.read_bits_int(1) != 0
        self.err_aocs2_magnet = self._io.read_bits_int(1) != 0
        self.err_aocs2_acc = self._io.read_bits_int(1) != 0
        self.err_aocs2_temp = self._io.read_bits_int(1) != 0
        self.err_payload_bus = self._io.read_bits_int(1) != 0
        self.err_icp1_bus = self._io.read_bits_int(1) != 0
        self.err_icp2_bus = self._io.read_bits_int(1) != 0
        self.err_reaction1 = self._io.read_bits_int(1) != 0
        self.err_reaction2 = self._io.read_bits_int(1) != 0
        self.err_reaction3 = self._io.read_bits_int(1) != 0
        self.err_oscillator = self._io.read_bits_int(1) != 0
        self._io.align_to_byte()
        self.fmc_mram_temp_value = self._io.read_u1()
        self.qspi_fram_temp = self._io.read_u1()
        self.io_expander_temp = self._io.read_u1()


