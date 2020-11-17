from hk_pcom import *

class PcomData():
    def createData(self):
        hk_packet = bytearray(hk_pcom_enabled([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_pcom_errors([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_pcom_signal_stre(100))
        hk_packet.extend(hk_pcom_last_packet(
            [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1]))

        hk_packet.extend(hk_pcom_dropped_packets(9))
        hk_packet.extend(hk_pcom_gs_packets(5))
        hk_packet.extend(hk_pcom_sent_packets(154))

        hk_packet.extend(hk_pcom_power_amp_temp(68))
        hk_packet.extend(hk_pcom_forward_rf_power(88))
        hk_packet.extend(hk_pcom_reflected_rf_power(99))
        hk_packet.extend(hk_pcom_temp_curr_1(150))
        hk_packet.extend(hk_pcom_temp_curr_2(160))
        return hk_packet


