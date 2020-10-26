meta:
  id: eps
  endian: le
seq:
# DEVICE ENABLED
  - id: reserved
    type: b1
  - id: internal_flash
    type: b1
  - id: internal_sram
    type: b1
  - id: adc1
    type: b1
  - id: adc2
    type: b1
  - id: adc3
    type: b1
  - id: fram1
    type: b1
  - id: fram2
    type: b1
  - id: rtc
    type: b1
  - id: icp0
    type: b1
  - id: icp1
    type: b1
  - id: reserved2
    type: b1
  - id: reserved3
    type: b1
  - id: reserved4
    type: b1
  - id: reserved5
    type: b1
  - id: reserved6
    type: b1
# DEVICE ERRORS
  - id: err_mcu
    type: b1
  - id: err_internal_flash
    type: b1
  - id: err_internal_sram
    type: b1
  - id: err_adc1
    type: b1
  - id: err_adc2
    type: b1
  - id: err_adc3
    type: b1
  - id: err_fram1
    type: b1
  - id: err_fram2
    type: b1
  - id: err_rtc
    type: b1
  - id: err_icp0
    type: b1
  - id: err_icp1
    type: b1
  - id: err_reserved1
    type: b1
  - id: err_reserved2
    type: b1
  - id: err_reserved3
    type: b1
  - id: err_reserved4
    type: b1
  - id: err_reserved5
    type: b1
# OTHER
  - id: bus_voltage
    type: u2
  - id: avg_power_balance
    type: s2
# BATTERY STATUS
  - id: bat_a
    type: b1
  - id: bat_b
    type: b1
  - id: bat_c
    type: b1
  - id: bat_d
    type: b1
  - id: bat_reserved1
    type: b1
  - id: bat_reserved2
    type: b1
  - id: bat_reserved3
    type: b1
  - id: bat_reserved4
    type: b1
  - id: bat_curr_a
    type: u2
  - id: bat_curr_b
    type: u2
  - id: bat_curr_c
    type: u2
  - id: bat_curr_d
    type: u2
  - id: bat_voltage_a
    type: u2
  - id: bat_voltage_b
    type: u2
  - id: bat_voltage_c
    type: u2
  - id: bat_voltage_d
    type: u2
  - id: bat_temp_a
    type: u2
  - id: bat_temp_b
    type: u2
  - id: bat_temp_c
    type: u2
  - id: bat_temp_d
    type: u2
# CURRENT CONSUMPTION
  - id: obc_curr_cons
    type: u2
  - id: com_curr_cons
    type: u2
  - id: eps_curr_cons
    type: u2
  - id: st_curr_const
    type: u2
  - id: x_plus_curr_cons
    type: u2
  - id: x_minus_curr_cons
    type: u2
  - id: y_plus_curr_cons
    type: u2
  - id: y_minus_curr_cons
    type: u2
  - id: z_plus_curr_cons
    type: u2
  - id: z_minus_curr_cons
    type: u2
  - id: cdp_curr_cons
    type: u2
  - id: cam_curr_cons
    type: u2
  - id: hscom_curr_cons
    type: u2
  - id: cre_curr_cons
    type: u2
  - id: cgp_curr_cons
    type: u2