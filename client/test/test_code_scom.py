from hk_scom import *
from client.kaitai.scom import *

hk_packet = bytearray(hk_scom_enabled([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
hk_packet.extend(hk_scom_errors([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
hk_packet.extend(hk_scom_signal_stre(100))
hk_packet.extend(hk_scom_last_packet([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1]))

hk_packet.extend(hk_scom_dropped_packets(9))
hk_packet.extend(hk_scom_gs_packets(5))
hk_packet.extend(hk_scom_sent_packets(154))
hk_packet.extend(hk_scom_digipeated_packets(47))

hk_packet.extend(hk_scom_power_amp_temp(68))
hk_packet.extend(hk_scom_forward_rf_power(88))
hk_packet.extend(hk_scom_reflected_rf_power(99))


for byte in hk_packet:
    print('{:02x}'.format(byte).upper(), end="")
print()

target = Scom.from_bytes(hk_packet)
print({target.digipeated_packets})
