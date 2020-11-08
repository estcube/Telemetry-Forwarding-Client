from hk_common import *
from client.kaitai.common import *


hk_packet = bytearray(hk_common_system_status(False, Housekeepings_Modes.HK_MODE_RES2, 0))
hk_packet.extend(hk_common_unix_timestamp())
hk_packet.extend(hk_common_commands_in_queue(300))
hk_packet.extend(hk_common_handled_commands(15))
hk_packet.extend(hk_common_handled_gs_commands(9))
hk_packet.extend(hk_common_number_of_errors(5))
hk_packet.extend(hk_common_time_last_error(154))
hk_packet.extend(hk_common_number_of_resets(3))
hk_packet.extend(hk_common_last_reset_reason(1234))
hk_packet.extend(hk_common_uptime(1258))
hk_packet.extend(hk_common_available_heap(1200))
hk_packet.extend(hk_common_active_tasks(98))
hk_packet.extend(hk_common_cpu_temp(47.3))
hk_packet.extend(hk_common_current_firmware_slot(1))
hk_packet.extend(hk_common_firmware_version(12345))
hk_packet.extend(hk_common_firmware_version(54879))
hk_packet.extend(hk_common_firmware_version(65535))
hk_packet.extend(hk_common_firmware_version(65535))
hk_packet.extend(hk_common_firmware_slot_status(0x0F))

for byte in hk_packet:
    print('{:02x}'.format(byte).upper(), end="")
print()

target = Common.from_bytes(hk_packet)

print({target.firm2})

