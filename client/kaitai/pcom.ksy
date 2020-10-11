meta:
  id: pcom
  endian: le
seq:
# DEVICE ENABLED
  - id: reserved
    type: b1
  - id: internal_flash
    type: b1
  - id: internal_sram
    type: b1
  - id: qspi_fram
    type: b1
  - id: spi_fram
    type: b1
  - id: transceiver
    type: b1
  - id: dac
    type: b1
  - id: icp0
    type: b1
  - id: icp1
    type: b1
  - id: icp2
    type: b1
  - id: oscillator
    type: b1
  - id: temp1
    type: b1
  - id: temp2
    type: b1
# DEVICE ERRORS
  - id: err_mcu
    type: b1
  - id: err_internal_flash
    type: b1
  - id: err_internal_sram
    type: b1
  - id: err_qspi_fram
    type: b1
  - id: err_spi_fram
    type: b1
  - id: err_transceiver
    type: b1
  - id: err_dac
    type: b1
  - id: err_icp0
    type: b1
  - id: err_icp1
    type: b1
  - id: err_icp2
    type: b1
  - id: err_oscillator
    type: b1
  - id: err_temp1
    type: b1
  - id: err_temp2
    type: b1
# OTHER
  - id: signal_stre
    type: u1
  - id: last_packet_time
    type: b31
  - id: last_packet_bool
    type: b1	
  - id: dropped_packets
    type: u4
  - id: gs_packets
    type: u4
  - id: sent_packets
    type: u4
  - id: power_amp_temp
    type: u1
  - id: forward_rf_power
    type: s1
  - id: reflected_rf_power
    type: s1
  - id: temp
    type: u1
enums:
  command:
    247: beacon_data
  beacon_mode:
    78: normal
    83: safe