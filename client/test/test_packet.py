from random import random

from hk_common import *
from hk_sp import *

from test_code_common import *
from test_code_eps import *
from test_code_aocs import *
from test_code_obc import *
from test_code_st import *
from test_code_sp import *
from test_code_pcom import *
from test_code_scom import *

from client.kaitai.main_kaitai import *


def generate_normal_beacon() -> bytearray:


    common = CommonData().createData()
    obc = ObcData().createData()
    aocs = AocsData().createData()
    hk_packet = common
    hk_packet.extend(obc)
    hk_packet.extend(aocs)

    return hk_packet


def generate_icp():
    beacon_data = generate_normal_beacon()

    f = bytearray()
    f.append(0x01)
    f.append(0x04)
    f.append(len(beacon_data))
    f.append(0xF7)
    f += random.randint(0, 16777214).to_bytes(3, "big")
    f.append(0x03)  # TODO Mode: NOW
    f += beacon_data
    f.append(0x05)  # TODO CRC
    f.append(0x05)

    return f

hk_packet = generate_icp()

for byte in hk_packet:
    print('{:02x}'.format(byte).upper(), end="")
print()

target = Main.from_bytes(hk_packet)
print({target.common_data.uptime})
print({target.spec_data.obc.fmc_mram_temp})
print({target.spec_data.aocs.sun_y_intensity_loc4})
