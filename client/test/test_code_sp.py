from hk_sp import *
from numberGen import generate

class SpData():
    def createData(self):
        enabled = [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]
        hk_packet = bytearray(hk_sp_enabled(enabled))
        hk_packet.extend(hk_sp_errors([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_sp_temp_current(generate(6, -10, 50)))
        hk_packet.extend(hk_sp_mppt_current(generate(6666, 0, 65535), enabled[9]))
        hk_packet.extend(hk_sp_coil_current(generate(6666, 0, 65535), enabled[10]))
        return hk_packet

