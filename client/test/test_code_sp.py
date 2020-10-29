from hk_sp import *
from client.kaitai.sp import *

hk_packet = bytearray(hk_sp_enabled([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
hk_packet.extend(hk_sp_errors([1, 1, 1, 1, 1, 1, 1, 0 , 1, 1, 0, 0, 1, 0, 0, 0]))
hk_packet.extend(hk_sp_temp_current(100))
hk_packet.extend(hk_sp_mppt_current(3080))
hk_packet.extend(hk_sp_coil_current(14900))

for byte in hk_packet:
    print('{:02x}'.format(byte).upper(), end="")
print()

target = Sp.from_bytes(hk_packet)
print({target.mppt_curr})
