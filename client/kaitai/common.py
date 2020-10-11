# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

from pkg_resources import parse_version
from kaitaistruct import __version__ as ks_version, KaitaiStruct, KaitaiStream, BytesIO
from enum import Enum


if parse_version(ks_version) < parse_version('0.7'):
    raise Exception("Incompatible Kaitai Struct Python API: 0.7 or later is required, but you have %s" % (ks_version))

class Common(KaitaiStruct):

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
        self.flags = self._io.read_bits_int(5)
        self.hk_mode = self._io.read_bits_int(2)
        self.info_validity = self._io.read_bits_int(1) != 0
        self._io.align_to_byte()
        self.unix_time = self._io.read_u4le()
        self.commands_queued = self._io.read_u2le()
        self.commands_handled = self._io.read_u4le()
        self.commands_gs = self._io.read_u1()
        self.errors = self._io.read_u4le()
        self.last_error_time = self._io.read_u4le()
        self.resets = self._io.read_u1()
        self.last_reset_reason = self._io.read_u4le()
        self.uptime = self._io.read_u4le()
        self.active_tasks = self._io.read_u1()
        self.cpu_temp = self._io.read_u1()
        self.current_firm = self._io.read_u1()
        self.firm1 = self._io.read_u2le()
        self.firm2 = self._io.read_u2le()
        self.firm3 = self._io.read_u2le()
        self.firm4 = self._io.read_u2le()
        self.crc1 = self._io.read_bits_int(1) != 0
        self.crc2 = self._io.read_bits_int(1) != 0
        self.crc3 = self._io.read_bits_int(1) != 0
        self.crc4 = self._io.read_bits_int(1) != 0
        self.boot_err1 = self._io.read_bits_int(1) != 0
        self.boot_err2 = self._io.read_bits_int(1) != 0
        self.boot_err3 = self._io.read_bits_int(1) != 0
        self.boot_err4 = self._io.read_bits_int(1) != 0


