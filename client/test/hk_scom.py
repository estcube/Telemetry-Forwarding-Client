def hk_scom_enabled(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    enabled_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        enabled_bits |= bits[i] << i

    return enabled_bits.to_bytes(2, byteorder='big')


def hk_scom_errors(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    error_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        error_bits |= bits[i] << i

    return error_bits.to_bytes(2, byteorder='big')

def hk_scom_signal_stre(stre: int) -> bytes:
    return stre.to_bytes(1, byteorder='little')

def hk_scom_last_packet(bits: list) -> bytes:

    """
    First bit should be on the left, bitfield is read from left to right
    """

    enabled_bits = 0
    bits.reverse()
    for i in range(len(bits)):
        enabled_bits |= bits[i] << i

    return enabled_bits.to_bytes(4, byteorder='big')


def hk_scom_dropped_packets(packets: int) -> bytes:
    return packets.to_bytes(4, byteorder='little')

def hk_scom_gs_packets(packets: int) -> bytes:
    return packets.to_bytes(4, byteorder='little')

def hk_scom_sent_packets(packets: int) -> bytes:
    return packets.to_bytes(4, byteorder='little')

def hk_scom_digipeated_packets(packets: int) -> bytes:
    return packets.to_bytes(4, byteorder='little')


def hk_scom_power_amp_temp(temp: int) -> bytes:
    return int((temp + 10) / 0.25).to_bytes(1, byteorder='little')

def hk_scom_forward_rf_power(power: int) -> bytes:
    return power.to_bytes(1, byteorder='little', signed=True)

def hk_scom_reflected_rf_power(power: int) -> bytes:
    return power.to_bytes(1, byteorder='little', signed=True)


