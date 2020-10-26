import random
from datetime import datetime, timedelta
from axFrameWriter import FrameBuilder
from hk_common import *
from hk_sp import *

class BeaconGenerator:

    def __init__(self, source: str, dest: str):
        self.ax = FrameBuilder()
        self.ax.setDest(dest)
        self.ax.setSource(source)

    def get_voltage(self) -> bytearray:
        return random.randint(100, 255).to_bytes(1, "big")

    def get_temp(self) -> bytearray:
        return random.randint(20, 240).to_bytes(1, "big")



    def generate_normal_beacon(self) -> bytearray:

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

        sp = bytearray(hk_sp_enabled([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        sp.extend(hk_sp_errors([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        sp.extend(hk_sp_temp_current(100))
        sp.extend(hk_sp_mppt_current(3080))
        sp.extend(hk_sp_coil_current(14900))

        hk_packet = common
        hk_packet.extend(sp)

        return hk_packet

    def generate_icp(self):
        beacon_data = self.generate_normal_beacon()

        f = bytearray()
        f.append(0x01)
        f.append(0x07)
        f.append(len(beacon_data))
        f.append(0xF7)
        f += random.randint(0, 16777214).to_bytes(3, "big")
        f.append(0x03)  # TODO Mode: NOW
        f += beacon_data
        f.append(0x05)  # TODO CRC
        f.append(0x05)

        return f

    def generate_ax(self):
        icp = self.generate_icp()
        self.ax.setInfo(icp)
        return self.ax.build()
