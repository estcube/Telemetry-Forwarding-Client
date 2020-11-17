def hk_sp_enabled(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    enabled_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        enabled_bits |= bits[i] << i
    return enabled_bits.to_bytes(2, byteorder='big')


def hk_sp_errors(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    error_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        error_bits |= bits[i] << i

    return error_bits.to_bytes(2, byteorder='big')


def hk_sp_temp_current(temp: int) -> bytes:
    return int((temp + 10) / 0.25).to_bytes(1, byteorder='little')

def hk_sp_mppt_current(mppt: int) -> bytes:
    return mppt.to_bytes(2, byteorder='little')

def hk_sp_coil_current(coil: int) -> bytes:
    return coil.to_bytes(2, byteorder='little')
