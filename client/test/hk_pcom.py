def hk_pcom_enabled(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    enabled_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        enabled_bits |= bits[i] << i

    return enabled_bits.to_bytes(2, byteorder='big')


def hk_pcom_errors(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    error_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        error_bits |= bits[i] << i

    return error_bits.to_bytes(2, byteorder='big')

def hk_pcom_signal_stre(stre: int) -> bytes:
    return stre.to_bytes(1, byteorder='little')

def hk_pcom_last_packet(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    enabled_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        enabled_bits |= bits[i] << i

    return enabled_bits.to_bytes(4, byteorder='big')


def hk_pcom_dropped_packets(packets: int) -> bytes:
    return packets.to_bytes(4, byteorder='little')

def hk_pcom_gs_packets(packets: int) -> bytes:
    return packets.to_bytes(4, byteorder='little')

def hk_pcom_sent_packets(packets: int) -> bytes:
    return packets.to_bytes(4, byteorder='little')


def hk_pcom_power_amp_temp(temp: int) -> bytes:
    return temp.to_bytes(1, byteorder='little')

def hk_pcom_forward_rf_power(power: int) -> bytes:
    return power.to_bytes(1, byteorder='little')

def hk_pcom_reflected_rf_power(power: int) -> bytes:
    return power.to_bytes(1, byteorder='little')

def hk_pcom_temp_curr_1(temp: int) -> bytes:
    return temp.to_bytes(1, byteorder='little')

def hk_pcom_temp_curr_2(temp: int) -> bytes:
    return temp.to_bytes(1, byteorder='little')


