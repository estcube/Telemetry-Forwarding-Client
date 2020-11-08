def hk_st_enabled(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    enabled_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        enabled_bits |= bits[i] << i

    return enabled_bits.to_bytes(2, byteorder='big')


def hk_st_errors(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    error_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        error_bits |= bits[i] << i

    return error_bits.to_bytes(2, byteorder='big')


def hk_st_fpga_temp(temp: int) -> bytes:
    return temp.to_bytes(2, byteorder='little')

def hk_st_sensor_temp(mppt: int) -> bytes:
    return mppt.to_bytes(2, byteorder='little')

