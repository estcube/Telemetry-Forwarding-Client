from hk_common import *

class CommonData():
    def createData(self):
        common = bytearray(hk_common_system_status(False, Housekeepings_Modes.HK_MODE_SAFE, 0))
        common.extend(hk_common_unix_timestamp())
        common.extend(hk_common_commands_in_queue(300))
        common.extend(hk_common_handled_commands(15))
        common.extend(hk_common_handled_gs_commands(9))
        common.extend(hk_common_number_of_errors(5))
        common.extend(hk_common_time_last_error(154))
        common.extend(hk_common_number_of_resets(3))
        common.extend(hk_common_last_reset_reason(1234))
        common.extend(hk_common_uptime(1258))
        common.extend(hk_common_available_heap(1200))
        common.extend(hk_common_active_tasks(98))
        common.extend(hk_common_cpu_temp(47.3))
        common.extend(hk_common_current_firmware_slot(1))
        common.extend(hk_common_firmware_version(12345))
        common.extend(hk_common_firmware_version(54879))
        common.extend(hk_common_firmware_version(65535))
        common.extend(hk_common_firmware_version(65535))
        common.extend(hk_common_firmware_slot_status(0x0F))

        return common

