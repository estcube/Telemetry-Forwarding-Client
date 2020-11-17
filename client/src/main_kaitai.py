# This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

from pkg_resources import parse_version
from kaitaistruct import __version__ as ks_version, KaitaiStruct, KaitaiStream, BytesIO
from enum import Enum


if parse_version(ks_version) < parse_version('0.7'):
    raise Exception("Incompatible Kaitai Struct Python API: 0.7 or later is required, but you have %s" % (ks_version))

from obc import Obc
from pcom import Pcom
from aocs import Aocs
from scom import Scom
from sp import Sp
from eps import Eps
from common import Common
from st import St
class MainKaitai(KaitaiStruct):

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
        self.cmd = self._io.read_u1()
        self.uuid = self._io.read_bytes(3)
        self.mode = self._io.read_u1()
        self.common_data = Common(self._io)
        _on = self.src
        if _on == 10:
            self.spec_data = self._root.Nodes(self._io, self, self._root)
        elif _on == 0:
            self.spec_data = self._root.Broad(self._io, self, self._root)
        elif _on == 4:
            self.spec_data = self._root.Obcs(self._io, self, self._root)
        elif _on == 6:
            self.spec_data = Sp(self._io)
        elif _on == 7:
            self.spec_data = Sp(self._io)
        elif _on == 1:
            self.spec_data = self._root.Mcs(self._io, self, self._root)
        elif _on == 11:
            self.spec_data = self._root.InvalidMac(self._io, self, self._root)
        elif _on == 3:
            self.spec_data = Eps(self._io)
        elif _on == 5:
            self.spec_data = St(self._io)
        elif _on == 8:
            self.spec_data = Sp(self._io)
        elif _on == 9:
            self.spec_data = Sp(self._io)
        elif _on == 2:
            self.spec_data = self._root.Com(self._io, self, self._root)
        self.crc = self._io.read_u2le()

    class Broad(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.broad = self._io.read_u1()


    class InvalidMac(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.error = self._io.read_u1()


    class Nodes(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.num = self._io.read_u1()


    class Obcs(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.obc = Obc(self._io)
            self.aocs = Aocs(self._io)


    class Com(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.pcom = Pcom(self._io)
            self.scom = Scom(self._io)


    class Mcs(KaitaiStruct):
        def __init__(self, _io, _parent=None, _root=None):
            self._io = _io
            self._parent = _parent
            self._root = _root if _root else self
            self._read()

        def _read(self):
            self.mcs = self._io.read_u1()



