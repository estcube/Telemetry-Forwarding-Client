meta:
  id: icp
  endian: be
seq:
  - id: dst
    type: u1
  - id: src
    type: u1
  - id: len
    type: u1
  - id: cmd
    type: u1
    enum: command
  - id: uuid
    size: 3
  - id: mode
    type: u1
  - id: data
    type:
      switch-on: cmd
      cases:
        'command::beacon_data': beacon_packet
        _: data_blob
  - id: crc
    type: u2

types:
  data_blob:
    seq:
      - id: data
        size: _parent.len
  beacon_packet:
    seq:
      - id: mode
        type: u1
        enum: beacon_mode
      - id: payload
        type:
          switch-on: mode
          cases:
            'beacon_mode::normal': beacon_payload_normal
            'beacon_mode::safe': beacon_payload_safe
  beacon_payload_normal:
    seq:
      - id: timestamp
        type: u4
      - id: main_bus_volt
        type: u1
      - id: avg_power_balance
        type: u1
      - id: bat_a_volt
        type: u1
      - id: bat_b_volt
        type: u1
      - id: bat_c_volt
        type: u1
      - id: bat_d_volt
        type: u1
      - id: bat_a_temp
        type: u1
      - id: bat_b_temp
        type: u1
      - id: bat_c_temp
        type: u1
      - id: bat_d_temp
        type: u1
      - id: spin_rate_z
        type: s2
      - id: recv_sig_str
        type: s1
      - id: sat_mission_phase
        type: b2
      - id: time_since_last_reset_obc
        type: b2
      - id: time_since_last_reset_com
        type: b2
      - id: time_since_last_reset_eps
        type: b2
      - id: tether_current
        type: u1
      - id: time_since_last_error_aoc
        type: b2
      - id: time_since_last_error_obc
        type: b2
      - id: time_since_last_error_com
        type: b2
      - id: time_since_last_error_eps
        type: b2
      - id: sys_stat_obc
        type: u1
      - id: sys_stat_eps
        type: u1
      - id: sys_stat_aocs
        type: u1
      - id: sys_stat_com
        type: u1
    instances:
      spin_rate_z_calc:
        value: (spin_rate_z * 720) / 2047
      tether_current_calc:
        value: tether_current * 5 / 255
  beacon_payload_safe:
    seq:
      - id: timestamp
        type: u4
      - id: err_code_1
        type: u1
      - id: err_code_2
        type: u1
      - id: err_code_3
        type: u1
      - id: time_safemode
        type: u2
      - id: main_bus_volt
        type: u1
      - id: status_obc
        type: b1
      - id: status_obc_bsw
        type: b1
      - id: status_com_3v3
        type: b1
      - id: status_pl_3v3
        type: b1
      - id: status_pl_5v
        type: b1
      - id: status_cam
        type: b1
      - id: status_aocs
        type: b1
      - id: status_st
        type: b1
      - id: status_bat_a_charging
        type: b1
      - id: status_bat_a_discharging
        type: b1
      - id: status_bat_b_charging
        type: b1
      - id: status_bat_b_discharging
        type: b1
      - id: status_bat_c_charging
        type: b1
      - id: status_bat_c_discharging
        type: b1
      - id: status_bat_d_charging
        type: b1
      - id: status_bat_d_discharging
        type: b1
      - id: status_spb_a_reg
        type: b1
      - id: status_spb_b_reg
        type: b1
      - id: status_3v3_a_reg
        type: b1
      - id: status_3v3_b_reg
        type: b1
      - id: status_5v_a_reg
        type: b1
      - id: status_5v_b_reg
        type: b1
      - id: status_12v_a_reg
        type: b1
      - id: status_12v_b_reg
        type: b1
      - id: bat_a_volt
        type: u1
      - id: bat_b_volt
        type: u1
      - id: bat_c_volt
        type: u1
      - id: bat_d_volt
        type: u1
      - id: bat_a_temp
        type: u1
      - id: bat_b_temp
        type: u1
      - id: bat_c_temp
        type: u1
      - id: bat_d_temp
        type: u1
      - id: power_balance
        type: s1
      - id: firmware_version
        type: u1
      - id: crash_counter
        type: u1
      - id: forwarded_rf_pow
        type: s1
      - id: reflected_rf_pow
        type: s1
      - id: received_sig_str
        type: s1
enums:
  command:
    247: beacon_data
  beacon_mode:
    78: normal
    83: safe
