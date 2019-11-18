# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

from pkg_resources import parse_version
from kaitaistruct import __version__ as ks_version, KaitaiStruct, KaitaiStream, BytesIO
from enum import Enum


if parse_version(ks_version) < parse_version('0.7'):
    raise Exception("Incompatible Kaitai Struct Python API: 0.7 or later is required, but you have %s" % (ks_version))

class Icp(KaitaiStruct):

    class Command(Enum):
        beacon_data = 247
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
        self.data = self._io.read_bytes(self.len)
        self.crc = self._io.read_u2le()


