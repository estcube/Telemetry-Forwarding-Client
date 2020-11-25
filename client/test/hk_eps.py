def hk_eps_enabled(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    enabled_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        enabled_bits |= bits[i] << i

    return enabled_bits.to_bytes(2, byteorder='big')


def hk_eps_errors(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    error_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        error_bits |= bits[i] << i

    return error_bits.to_bytes(2, byteorder='big')


def hk_eps_bus_voltage(volt: int) -> bytes:
    return volt.to_bytes(2, byteorder='little')

def hk_eps_avg_power_balance(power: int) -> bytes:
    return power.to_bytes(2, byteorder='little', signed=True)

def hk_eps_battery_status(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    enabled_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        enabled_bits |= bits[i] << i

    return enabled_bits.to_bytes(1, byteorder='big')


def hk_eps_bat_curr_a(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')

def hk_eps_bat_curr_b(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')

def hk_eps_bat_curr_c(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')

def hk_eps_bat_curr_d(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')


def hk_eps_bat_volt_a(volt: int) -> bytes:
    return volt.to_bytes(2, byteorder='little')

def hk_eps_bat_volt_b(volt: int) -> bytes:
    return volt.to_bytes(2, byteorder='little')

def hk_eps_bat_volt_c(volt: int) -> bytes:
    return volt.to_bytes(2, byteorder='little')

def hk_eps_bat_volt_d(volt: int) -> bytes:
    return volt.to_bytes(2, byteorder='little')


def hk_eps_bat_temp_a(temp: int) -> bytes:
    return temp.to_bytes(2, byteorder='little')

def hk_eps_bat_temp_b(temp: int) -> bytes:
    return temp.to_bytes(2, byteorder='little')

def hk_eps_bat_temp_c(temp: int) -> bytes:
    return temp.to_bytes(2, byteorder='little')

def hk_eps_bat_temp_d(temp: int) -> bytes:
    return temp.to_bytes(2, byteorder='little')


def hk_eps_obc_curr_cons(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')

def hk_eps_com_curr_cons(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')

def hk_eps_eps_curr_cons(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')

def hk_eps_st_curr_cons(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')


def hk_eps_x_plus_curr_cons(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')

def hk_eps_x_minus_curr_cons(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')

def hk_eps_y_plus_curr_cons(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')

def hk_eps_y_minus_curr_cons(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')

def hk_eps_z_plus_curr_cons(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')

def hk_eps_z_minus_curr_cons(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')


def hk_eps_cdp_curr_cons(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')

def hk_eps_cam_curr_cons(handled_commands: int) -> bytes:
    return handled_commands.to_bytes(2, byteorder='little')

def hk_eps_hscom_curr_cons(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')

def hk_eps_cre_curr_cons(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')

def hk_eps_cgp_curr_cons(current: int) -> bytes:
    return current.to_bytes(2, byteorder='little')
