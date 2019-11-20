meta:
  id: icp
  endian: le
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
  - id: beacon
    size: len
    type: beacon_packet
    if: cmd == command::beacon_data
  - id: data
    size: len
    if: cmd != command::beacon_data
  - id: crc
    type: u2

types:
  beacon_packet:
    seq:
      - id: mode
        type: u1
        enum: beacon_mode
      - id: normal_payload
        type: normal_beacon_packet
        if: mode == beacon_mode::normal
  normal_beacon_packet:
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
enums:
  command:
    247: beacon_data
  beacon_mode:
    78: normal
    83: safe