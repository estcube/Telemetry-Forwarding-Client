import random
import time
from enum import Enum, auto, unique


@unique
class Housekeepings_Modes(Enum):
    HK_MODE_NORMAL = 0x00  # Normal operations
    HK_MODE_SAFE = 0x01  # Safe mode
    HK_MODE_RES1 = 0x02  # Reserved 1
    HK_MODE_RES2 = 0x03  # Reserved 2


def hk_common_system_status(information_invalid: bool, hk_mode: Housekeepings_Modes, sys_flags: int) -> bytes:
    # Various subsystem flags
    system_status = random.getrandbits(5)
    # HK packet mode
    system_status |= hk_mode.value << 5
    # Information validty
    system_status |= information_invalid << 7

    return system_status.to_bytes(1, byteorder='big')


def hk_common_unix_timestamp() -> bytes:
    return int(time.time()).to_bytes(4, byteorder='little')


def hk_common_commands_in_queue(number_of_commands: int) -> bytes:
    return number_of_commands.to_bytes(2, byteorder='little')


def hk_common_handled_commands(handled_commands: int) -> bytes:
    return handled_commands.to_bytes(4, byteorder='little')


def hk_common_handled_gs_commands(handled_commands: int) -> bytes:
    return handled_commands.to_bytes(1, byteorder="little")


def hk_common_number_of_errors(error_amount: int) -> bytes:
    return error_amount.to_bytes(4, byteorder='little')


def hk_common_time_last_error(ticks_since_error: int) -> bytes:
    return ticks_since_error.to_bytes(4, byteorder='little')


def hk_common_number_of_resets(reset_amount: int) -> bytes:
    return reset_amount.to_bytes(1, byteorder='little')


def hk_common_last_reset_reason(rcc_register_contents: int) -> bytes:
    return rcc_register_contents.to_bytes(4, byteorder='little')


def hk_common_uptime(uptime_ticks: int) -> bytes:
    return uptime_ticks.to_bytes(4, byteorder='little')


def hk_common_available_heap(amount_of_free_bytes: int) -> bytes:
    return amount_of_free_bytes.to_bytes(2, byteorder='little')


def hk_common_active_tasks(number_of_tasks: int) -> bytes:
    return number_of_tasks.to_bytes(1, byteorder='little')


def hk_common_cpu_temp(temp_in_celcius: int) -> bytes:
    return int(temp_in_celcius / 0.25).to_bytes(1, byteorder='little')


def hk_common_current_firmware_slot(current_slot_number: int) -> bytes:
    if (1 <= current_slot_number < 5):
        return current_slot_number.to_bytes(1, byteorder='little')
    else:
        raise ValueError("Invalid slot number of %i given." % current_slot_number)


def hk_common_firmware_version(firmware_version: int) -> bytes:
    return firmware_version.to_bytes(2, byteorder='little')


def hk_common_firmware_slot_status(slot_status: int) -> bytes:
    return slot_status.to_bytes(1, byteorder='little')
