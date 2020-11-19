from hk_eps import *
from numberGen import generate

class EpsData():
    def createData(self):
        hk_packet = bytearray(hk_eps_enabled([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_eps_errors([1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_eps_bus_voltage(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_avg_power_balance(generate(333, -32768, 32767)))
        hk_packet.extend(hk_eps_battery_status([1, 1, 1, 1, 1, 1, 1, 1]))

        hk_packet.extend(hk_eps_bat_curr_a(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_bat_curr_b(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_bat_curr_c(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_bat_curr_d(generate(3333, 0, 65535)))

        hk_packet.extend(hk_eps_bat_volt_a(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_bat_volt_b(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_bat_volt_c(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_bat_volt_d(generate(3333, 0, 65535)))

        hk_packet.extend(hk_eps_bat_temp_a(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_bat_temp_b(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_bat_temp_c(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_bat_temp_d(generate(3333, 0, 65535)))

        hk_packet.extend(hk_eps_obc_curr_cons(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_com_curr_cons(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_eps_curr_cons(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_st_curr_cons(generate(3333, 0, 65535)))

        hk_packet.extend(hk_eps_x_plus_curr_cons(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_x_minus_curr_cons(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_y_plus_curr_cons(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_y_minus_curr_cons(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_z_plus_curr_cons(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_z_minus_curr_cons(generate(3333, 0, 65535)))

        hk_packet.extend(hk_eps_cdp_curr_cons(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_cam_curr_cons(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_hscom_curr_cons(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_cre_curr_cons(generate(3333, 0, 65535)))
        hk_packet.extend(hk_eps_cgp_curr_cons(generate(3333, 0, 65535)))

        return hk_packet

