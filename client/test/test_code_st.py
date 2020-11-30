from hk_st import *
from numberGen import generate

class StData():
    def createData(self):
        hk_packet = bytearray(hk_st_enabled([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_st_errors([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_st_fpga_temp(generate(5555, 0, 65535)))
        hk_packet.extend(hk_st_sensor_temp(generate(5555, 0, 65535)))
        return hk_packet



