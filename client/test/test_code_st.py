from hk_st import *
from client.kaitai.st import *


hk_packet = bytearray(hk_st_enabled([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
hk_packet.extend(hk_st_errors([1, 1, 1, 1, 1, 1, 1, 0 , 1, 1, 0, 0, 1, 0, 0, 0]))
hk_packet.extend(hk_st_fpga_temp(100))
hk_packet.extend(hk_st_sensor_temp(3080))

for byte in hk_packet:
    print('{:02x}'.format(byte).upper(), end="")
print()

target = St.from_bytes(hk_packet)
print({target.fpga_temp})