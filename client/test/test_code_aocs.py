from hk_aocs import *
from numberGen import generate

class AocsData():
    def createData(self):
        hk_packet = bytearray(hk_aocs_bmg160_gyro_x(generate(444, -32768, 32767)))
        hk_packet.extend(hk_aocs_bmg160_gyro_y(generate(444, -32768, 32767)))
        hk_packet.extend(hk_aocs_bmg160_gyro_z(generate(444, -32768, 32767)))

        hk_packet.extend(hk_aocs_lis3mdl_magnet_x(generate(-444, -32768, 32767)))
        hk_packet.extend(hk_aocs_lis3mdl_magnet_y(generate(-444, -32768, 32767)))
        hk_packet.extend(hk_aocs_lis3mdl_magnet_z(generate(-444, -32768, 32767)))

        hk_packet.extend(hk_aocs_sun_x_intensity1(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_x_intensity2(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_x_intensity3(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_x_intensity4(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_x_intensity5(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_x_intensity6(generate(4444, 0, 65535)))

        hk_packet.extend(hk_aocs_sun_x_intensity_loc1(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_x_intensity_loc2(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_x_intensity_loc3(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_x_intensity_loc4(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_x_intensity_loc5(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_x_intensity_loc6(generate(4444, 0, 65535)))

        hk_packet.extend(hk_aocs_sun_y_intensity1(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_y_intensity2(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_y_intensity3(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_y_intensity4(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_y_intensity5(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_y_intensity6(generate(4444, 0, 65535)))

        hk_packet.extend(hk_aocs_sun_y_intensity_loc1(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_y_intensity_loc2(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_y_intensity_loc3(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_y_intensity_loc4(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_y_intensity_loc5(generate(4444, 0, 65535)))
        hk_packet.extend(hk_aocs_sun_y_intensity_loc6(generate(4444, 0, 65535)))

        hk_packet.extend(hk_aocs_mcp9808_temp1(generate(30, 0, 255)))
        hk_packet.extend(hk_aocs_mcp9808_temp2(generate(30, 0, 255)))

        hk_packet.extend(hk_aocs_modes([1, 1, 1, 1, 1, 1, 1, 0]))

        hk_packet.extend(hk_aocs_reaction_wheel1(generate(100, -32768, 32767)))
        hk_packet.extend(hk_aocs_reaction_wheel2(generate(110, -32768, 32767)))
        hk_packet.extend(hk_aocs_reaction_wheel3(generate(120, -32768, 32767)))
        return hk_packet



