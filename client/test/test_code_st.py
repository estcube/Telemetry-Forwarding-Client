from hk_st import *

class StData():
    def createData(self):
        hk_packet = bytearray(hk_st_enabled([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_st_errors([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_st_fpga_temp(100))
        hk_packet.extend(hk_st_sensor_temp(3080))
        return hk_packet



