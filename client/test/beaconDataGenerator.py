import random
from axFrameWriter import FrameBuilder
from test_code_common import *
from test_code_eps import *
from test_code_aocs import *
from test_code_obc import *
from test_code_st import *
from test_code_sp import *
from test_code_pcom import *
from test_code_scom import *

class BeaconGenerator:

    def __init__(self, source: str, dest: str):
        self.ax = FrameBuilder()
        self.ax.setDest(dest)
        self.ax.setSource(source)

    def get_voltage(self) -> bytearray:
        return random.randint(100, 255).to_bytes(1, "big")

    def get_temp(self) -> bytearray:
        return random.randint(20, 240).to_bytes(1, "big")



    def generate_normal_beacon(self, src: int) -> bytearray:

        hk_packet = CommonData().createData()
        spec = bytearray()

        if src == 2:
            spec = PcomData().createData()
            spec.extend(ScomData().createData())
        elif src == 3:
            spec = EpsData().createData()
        elif src == 4:
            spec = ObcData().createData()
            spec.extend(AocsData().createData())
        elif src == 5:
            spec = StData().createData()
        elif 6 <= src <= 9:
            spec = SpData().createData()
        else:
            print("ERROR")

        hk_packet.extend(spec)
        return hk_packet

    def generate_icp(self, src: int):

        """
        Paremeter src specifies the subsystem from which the data comes from
        """

        beacon_data = self.generate_normal_beacon(src)

        f = bytearray()
        f.append(0x01)
        f.append(src)
        f.append(len(beacon_data))
        f.append(0xF7)
        tmp = random.randint(0, 16777214)
        print("UUID CHECK: ", tmp)
        f += tmp.to_bytes(3, "big")
        f.append(0x03)  # TODO Mode: NOW
        f += beacon_data
        f.append(0x05)  # TODO CRC
        f.append(0x05)

        return f

    def generate_ax(self):
        icp = self.generate_icp(2)
        self.ax.setInfo(icp)
        return self.ax.build()
