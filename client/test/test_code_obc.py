from hk_obc import *
from client.kaitai.obc import *

hk_packet = bytearray(hk_obc_enabled([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
hk_packet.extend(hk_obc_errors([1, 1, 1, 1, 1, 1, 1, 0 , 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
hk_packet.extend(hk_obc_fmc_mram_temp(100))
hk_packet.extend(hk_obc_qspi_fram_temp(255))
hk_packet.extend(hk_obc_io_expander_temp(180))

for byte in hk_packet:
    print('{:02x}'.format(byte).upper(), end="")
print()

target = Obc.from_bytes(hk_packet)
print({target.io_expander_temp})
