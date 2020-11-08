def hk_obc_enabled(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    enabled_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        enabled_bits |= bits[i] << i

    return enabled_bits.to_bytes(4, byteorder='big')


def hk_obc_errors(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    error_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        error_bits |= bits[i] << i

    return error_bits.to_bytes(4, byteorder='big')

def hk_obc_fmc_mram_temp(temp: int) -> bytes:
    return temp.to_bytes(1, byteorder='little')

def hk_obc_qspi_fram_temp(temp: int) -> bytes:
    return temp.to_bytes(1, byteorder='little')

def hk_obc_io_expander_temp(temp: int) -> bytes:
    return temp.to_bytes(1, byteorder='little')


