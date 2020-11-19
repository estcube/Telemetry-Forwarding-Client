from hk_scom import *
from numberGen import generate

class ScomData():
    def createData(self):
        hk_packet = bytearray(hk_scom_enabled([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_scom_errors([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_scom_signal_stre(generate(22, 0, 255)))
        hk_packet.extend(hk_scom_last_packet(
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1]))

        hk_packet.extend(hk_scom_dropped_packets(generate(222, 0, 4294967295)))
        hk_packet.extend(hk_scom_gs_packets(generate(222, 0, 4294967295)))
        hk_packet.extend(hk_scom_sent_packets(generate(222, 0, 4294967295)))
        hk_packet.extend(hk_scom_digipeated_packets(generate(222, 0, 4294967295)))

        hk_packet.extend(hk_scom_power_amp_temp(generate(22, -10, 50)))
        hk_packet.extend(hk_scom_forward_rf_power(generate(0, -128, 127)))
        hk_packet.extend(hk_scom_reflected_rf_power(generate(0, -128, 127)))
        return hk_packet



