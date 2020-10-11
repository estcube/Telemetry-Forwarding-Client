meta:
  id: sp
  endian: le
seq:
# DEVICE ENABLED
  - id: reserved
    type: b1
  - id: internal_flash
    type: b1
  - id: internal_sram
    type: b1
  - id: sunsensor
    type: b1
  - id: fram1
    type: b1
  - id: fram2
    type: b1
  - id: icp0
    type: b1
  - id: mag
    type: b1
  - id: temp
    type: b1
  - id: mppt
    type: b1
  - id: coil
    type: b1
  - id: reserved1
    type: b1
  - id: reserved2
    type: b1
# DEVICE ERRORS
  - id: err_mcu
    type: b1
  - id: err_internal_flash
    type: b1
  - id: err_internal_sram
    type: b1
  - id: err_sunsensor
    type: b1
  - id: err_fram1
    type: b1
  - id: err_fram2
    type: b1
  - id: err_icp0
    type: b1
  - id: err_mag
    type: b1
  - id: err_temp
    type: b1
  - id: err_mppt
    type: b1
  - id: err_coil
    type: b1
  - id: err_reserved1
    type: b1
  - id: err_reserved2
    type: b1
# OTHER
  - id: temp_curr
    type: u1
  - id: mppt_curr
    type: u2
  - id: coil_curr
    type: u2	
enums:
  command:
    247: beacon_data
  beacon_mode:
    78: normal
    83: safe