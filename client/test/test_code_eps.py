from hk_eps import *

class EpsData():
    def createData(self):
        hk_packet = bytearray(hk_eps_enabled([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_eps_errors([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_eps_bus_voltage(100))
        hk_packet.extend(hk_eps_avg_power_balance(300))
        hk_packet.extend(hk_eps_battery_status([1, 1, 1, 1, 1, 1, 1, 1]))

        hk_packet.extend(hk_eps_bat_curr_a(9))
        hk_packet.extend(hk_eps_bat_curr_b(9))
        hk_packet.extend(hk_eps_bat_curr_c(9))
        hk_packet.extend(hk_eps_bat_curr_d(9))

        hk_packet.extend(hk_eps_bat_volt_a(5))
        hk_packet.extend(hk_eps_bat_volt_b(5))
        hk_packet.extend(hk_eps_bat_volt_c(5))
        hk_packet.extend(hk_eps_bat_volt_d(5))

        hk_packet.extend(hk_eps_bat_temp_a(154))
        hk_packet.extend(hk_eps_bat_temp_b(154))
        hk_packet.extend(hk_eps_bat_temp_c(154))
        hk_packet.extend(hk_eps_bat_temp_d(154))

        hk_packet.extend(hk_eps_obc_curr_cons(1100))
        hk_packet.extend(hk_eps_com_curr_cons(1234))
        hk_packet.extend(hk_eps_eps_curr_cons(1258))
        hk_packet.extend(hk_eps_st_curr_cons(1200))

        hk_packet.extend(hk_eps_x_plus_curr_cons(98))
        hk_packet.extend(hk_eps_x_minus_curr_cons(98))
        hk_packet.extend(hk_eps_y_plus_curr_cons(98))
        hk_packet.extend(hk_eps_y_minus_curr_cons(98))
        hk_packet.extend(hk_eps_z_plus_curr_cons(98))
        hk_packet.extend(hk_eps_z_minus_curr_cons(98))

        hk_packet.extend(hk_eps_cdp_curr_cons(1))
        hk_packet.extend(hk_eps_cam_curr_cons(12345))
        hk_packet.extend(hk_eps_hscom_curr_cons(54879))
        hk_packet.extend(hk_eps_cre_curr_cons(65535))
        hk_packet.extend(hk_eps_cgp_curr_cons(65535))

        return hk_packet

