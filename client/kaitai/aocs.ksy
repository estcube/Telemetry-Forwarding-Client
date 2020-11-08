meta:
  id: aocs
  endian: le
seq:
# ANGULAR VELOCITY
  - id: bmg160_gyro_x
    type: s2
  - id: bmg160_gyro_y
    type: s2
  - id: bmg160_gyro_z
    type: s2
# MAGNETIC FIELD
  - id: lis3mdl_magnet_x
    type: s2
  - id: lis3mdl_magnet_y
    type: s2
  - id: lis3mdl_magnet_z
    type: s2
# SUN DIRECTION
  - id: sun_x_intensity1
    type: u2
  - id: sun_x_intensity2
    type: u2
  - id: sun_x_intensity3
    type: u2
  - id: sun_x_intensity4
    type: u2
  - id: sun_x_intensity5
    type: u2
  - id: sun_x_intensity6
    type: u2	
  - id: sun_x_intensity_loc1
    type: u2
  - id: sun_x_intensity_loc2
    type: u2
  - id: sun_x_intensity_loc3
    type: u2
  - id: sun_x_intensity_loc4
    type: u2
  - id: sun_x_intensity_loc5
    type: u2
  - id: sun_x_intensity_loc6
    type: u2	
  - id: sun_y_intensity1
    type: u2
  - id: sun_y_intensity2
    type: u2
  - id: sun_y_intensity3
    type: u2
  - id: sun_y_intensity4
    type: u2
  - id: sun_y_intensity5
    type: u2
  - id: sun_y_intensity6
    type: u2
  - id: sun_y_intensity_loc1
    type: u2
  - id: sun_y_intensity_loc2
    type: u2
  - id: sun_y_intensity_loc3
    type: u2
  - id: sun_y_intensity_loc4
    type: u2
  - id: sun_y_intensity_loc5
    type: u2
  - id: sun_y_intensity_loc6
    type: u2	
  - id: mcp9808_temp1
    type: u1
  - id: mcp9808_temp2
    type: u1		
# MODES
  - id: pointing
    type: b1
  - id: detumbling
    type: b1
  - id: spin_up
    type: b1
  - id: diagnostics
    type: b1
  - id: custom
    type: b1
  - id: reserved
    type: b1
  - id: low_precision
    type: b1
  - id: high_precision
    type: b1	
# ROTATIONS
  - id: reaction_wheel1
    type: s2
  - id: reaction_wheel2
    type: s2
  - id: reaction_wheel3
    type: s2

enums:
  command:
    247: beacon_data
  beacon_mode:
    78: normal
    83: safe