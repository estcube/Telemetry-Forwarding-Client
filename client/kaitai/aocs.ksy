meta:
  id: aocs
  endian: le
seq:
# ANGULAR VELOCITY
  - id: bmg160_gyro_x
    size: 2
  - id: bmg160_gyro_y
    size: 2
  - id: bmg160_gyro_z
    size: 2	
# MAGNETIC FIELD
  - id: lis3mdl_magnet_x
    size: 2
  - id: lis3mdl_magnet_y
    size: 2
  - id: lis3mdl_magnet_z
    size: 2	
# SUN DIRECTION
  - id: sun_x_intensity
    type: u2
  - id: sun_x_intensity_loc
    type: u2
  - id: sun_y_intensity
    type: u2
  - id: sun_y_intensity_loc
    type: u2
  - id: mcp9808_temp
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
    size: 2
  - id: reaction_wheel2
    size: 2
  - id: reaction_wheel3
    size: 2	
enums:
  command:
    247: beacon_data
  beacon_mode:
    78: normal
    83: safe