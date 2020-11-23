meta:
  id: scom
  endian: le
seq:
# DEVICE ENABLED
  - id: scom_reserved
    type: b1
  - id: scom_internal_flash
    type: b1
  - id: scom_internal_sram
    type: b1
  - id: scom_qspi_fram
    type: b1
  - id: scom_spi_fram
    type: b1
  - id: scom_transceiver
    type: b1
  - id: scom_dac
    type: b1
  - id: scom_icp2
    type: b1
  - id: scom_oscillator
    type: b1
  - id: scom_temp1
    type: b1
  - id: scom_temp2
    type: b1
  - id: scom_reserved2
    type: b1
  - id: scom_reserved3
    type: b1
  - id: scom_reserved4
    type: b1
  - id: scom_reserved5
    type: b1
  - id: scom_reserved6
    type: b1
# DEVICE ERRORS
  - id: scom_err_mcu
    type: b1
  - id: scom_err_internal_flash
    type: b1
  - id: scom_err_internal_sram
    type: b1
  - id: scom_err_qspi_fram
    type: b1
  - id: scom_err_spi_fram
    type: b1
  - id: scom_err_transceiver
    type: b1
  - id: scom_err_dac
    type: b1
  - id: scom_err_icp2
    type: b1
  - id: scom_err_oscillator
    type: b1
  - id: scom_err_temp1
    type: b1
  - id: scom_err_temp2
    type: b1
  - id: scom_err_reserved1
    type: b1
  - id: scom_err_reserved2
    type: b1
  - id: scom_err_reserved3
    type: b1
  - id: scom_err_reserved4
    type: b1
  - id: scom_err_reserved5
    type: b1	
# OTHER
  - id: scom_signal_stre
    type: u1
  - id: scom_last_packet_time
    type: b31
  - id: scom_last_packet_bool
    type: b1	
  - id: scom_dropped_packets
    type: u4
  - id: scom_gs_packets
    type: u4
  - id: scom_sent_packets
    type: u4 
  - id: scom_digipeated_packets
    type: u4
  - id: scom_power_amp_temp
    type: u1
  - id: scom_forward_rf_power
    type: s1
  - id: scom_reflected_rf_power
    type: s1