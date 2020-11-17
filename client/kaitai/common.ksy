meta:
  id: common
  endian: le
seq:
# SYSTEM STATUS
  - id: info_validity
    type: b1
  - id: hk_mode
    type: b2
  - id: flags
    type: b5
  - id: unix_time
# OTHER
    type: u4
  - id: commands_queued
    type: u2
  - id: commands_handled
    type: u4
  - id: commands_gs
    type: u1
  - id: errors
    type: u4
  - id: last_error_time
    type: u4
  - id: resets
    type: u1
  - id: last_reset_reason
    type: u4
  - id: uptime
    type: u4
  - id: available_heap
    type: u2
  - id: active_tasks
    type: u1
  - id: cpu_temp
    type: u1
# FIRMWARE
  - id: current_firm
    type: u1
  - id: firm1
    type: u2
  - id: firm2
    type: u2
  - id: firm3
    type: u2
  - id: firm4
    type: u2
# FIRMWARE SLOT STATUS
  - id: crc1
    type: b1
  - id: crc2
    type: b1
  - id: crc3
    type: b1
  - id: crc4
    type: b1
  - id: boot_err1
    type: b1
  - id: boot_err2
    type: b1
  - id: boot_err3
    type: b1
  - id: boot_err4
    type: b1