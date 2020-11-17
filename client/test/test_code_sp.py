from hk_sp import *

class SpData():
    def createData(self):
        hk_packet = bytearray(hk_sp_enabled([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_sp_errors([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_sp_temp_current(100))
        hk_packet.extend(hk_sp_mppt_current(3080))
        hk_packet.extend(hk_sp_coil_current(14900))
        return hk_packet
