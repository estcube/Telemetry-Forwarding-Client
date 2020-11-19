def hk_aocs_bmg160_gyro_x(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little', signed=True)

def hk_aocs_bmg160_gyro_y(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little', signed=True)

def hk_aocs_bmg160_gyro_z(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little', signed=True)


def hk_aocs_lis3mdl_magnet_x(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little', signed=True)

def hk_aocs_lis3mdl_magnet_y(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little', signed=True)

def hk_aocs_lis3mdl_magnet_z(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little', signed=True)


def hk_aocs_sun_x_intensity1(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_x_intensity2(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_x_intensity3(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_x_intensity4(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_x_intensity5(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_x_intensity6(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')


def hk_aocs_sun_x_intensity_loc1(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_x_intensity_loc2(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_x_intensity_loc3(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_x_intensity_loc4(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_x_intensity_loc5(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_x_intensity_loc6(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')


def hk_aocs_sun_y_intensity1(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_y_intensity2(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_y_intensity3(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_y_intensity4(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_y_intensity5(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_y_intensity6(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')


def hk_aocs_sun_y_intensity_loc1(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_y_intensity_loc2(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_y_intensity_loc3(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_y_intensity_loc4(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_y_intensity_loc5(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')

def hk_aocs_sun_y_intensity_loc6(value: int) -> bytes:
    return value.to_bytes(2, byteorder='little')


def hk_aocs_mcp9808_temp1(temp: int) -> bytes:
    return temp.to_bytes(1, byteorder='little')

def hk_aocs_mcp9808_temp2(temp: int) -> bytes:
    return temp.to_bytes(1, byteorder='little')


def hk_aocs_modes(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    enabled_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        enabled_bits |= bits[i] << i

    return enabled_bits.to_bytes(1, byteorder='big')


def hk_aocs_reaction_wheel1(rotations: int) -> bytes:
    return rotations.to_bytes(2, byteorder='little', signed=True)

def hk_aocs_reaction_wheel2(rotations: int) -> bytes:
    return rotations.to_bytes(2, byteorder='little', signed=True)

def hk_aocs_reaction_wheel3(rotations: int) -> bytes:
    return rotations.to_bytes(2, byteorder='little', signed=True)



