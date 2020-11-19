from hk_pcom import *
from numberGen import generate

class PcomData():
    def createData(self):
        hk_packet = bytearray(hk_pcom_enabled([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_pcom_errors([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_pcom_signal_stre(generate(22, 0, 255)))
        hk_packet.extend(hk_pcom_last_packet(
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1]))

        hk_packet.extend(hk_pcom_dropped_packets(generate(222, 0, 4294967295)))
        hk_packet.extend(hk_pcom_gs_packets(generate(222, 0, 4294967295)))
        hk_packet.extend(hk_pcom_sent_packets(generate(222, 0, 4294967295)))

        hk_packet.extend(hk_pcom_power_amp_temp(generate(22, -10, 50)))
        hk_packet.extend(hk_pcom_forward_rf_power(generate(0, -128, 127)))
        hk_packet.extend(hk_pcom_reflected_rf_power(generate(0, -128, 127)))
        hk_packet.extend(hk_pcom_temp_curr_1(generate(22, -10, 50)))
        hk_packet.extend(hk_pcom_temp_curr_2(generate(22, -10, 50)))
        return hk_packet


