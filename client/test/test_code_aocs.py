from hk_aocs import *
from client.kaitai.aocs import *


hk_packet = bytearray(hk_aocs_bmg160_gyro_x(30))
hk_packet.extend(hk_aocs_bmg160_gyro_y(32))
hk_packet.extend(hk_aocs_bmg160_gyro_z(34))

hk_packet.extend(hk_aocs_lis3mdl_magnet_x(100))
hk_packet.extend(hk_aocs_lis3mdl_magnet_y(300))
hk_packet.extend(hk_aocs_lis3mdl_magnet_z(9))

hk_packet.extend(hk_aocs_sun_x_intensity1(9))
hk_packet.extend(hk_aocs_sun_x_intensity2(9))
hk_packet.extend(hk_aocs_sun_x_intensity3(9))
hk_packet.extend(hk_aocs_sun_x_intensity4(5))
hk_packet.extend(hk_aocs_sun_x_intensity5(5))
hk_packet.extend(hk_aocs_sun_x_intensity6(5))

hk_packet.extend(hk_aocs_sun_x_intensity_loc1(5))
hk_packet.extend(hk_aocs_sun_x_intensity_loc2(154))
hk_packet.extend(hk_aocs_sun_x_intensity_loc3(155))
hk_packet.extend(hk_aocs_sun_x_intensity_loc4(156))
hk_packet.extend(hk_aocs_sun_x_intensity_loc5(157))
hk_packet.extend(hk_aocs_sun_x_intensity_loc6(158))

hk_packet.extend(hk_aocs_sun_y_intensity1(124))
hk_packet.extend(hk_aocs_sun_y_intensity2(134))
hk_packet.extend(hk_aocs_sun_y_intensity3(144))
hk_packet.extend(hk_aocs_sun_y_intensity4(164))
hk_packet.extend(hk_aocs_sun_y_intensity5(174))
hk_packet.extend(hk_aocs_sun_y_intensity6(184))

hk_packet.extend(hk_aocs_sun_y_intensity_loc1(14))
hk_packet.extend(hk_aocs_sun_y_intensity_loc2(24))
hk_packet.extend(hk_aocs_sun_y_intensity_loc3(54))
hk_packet.extend(hk_aocs_sun_y_intensity_loc4(34))
hk_packet.extend(hk_aocs_sun_y_intensity_loc5(74))
hk_packet.extend(hk_aocs_sun_y_intensity_loc6(94))

hk_packet.extend(hk_aocs_mcp9808_temp1(90))
hk_packet.extend(hk_aocs_mcp9808_temp2(100))

hk_packet.extend(hk_aocs_modes([1, 1, 1, 1, 1, 1, 1, 0]))

hk_packet.extend(hk_aocs_reaction_wheel1(222))
hk_packet.extend(hk_aocs_reaction_wheel2(111))
hk_packet.extend(hk_aocs_reaction_wheel3(55))

for byte in hk_packet:
    print('{:02x}'.format(byte).upper(), end="")
print()

target = Aocs.from_bytes(hk_packet)
print({target.reaction_wheel2})
