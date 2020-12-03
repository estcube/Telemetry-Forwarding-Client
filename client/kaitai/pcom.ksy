meta:
  id: pcom
  endian: le
seq:
# DEVICE ENABLED
  - id: pcom_reserved1
    type: b1
  - id: pcom_internal_flash
    type: b1
  - id: pcom_internal_sram
    type: b1
  - id: pcom_qspi_fram
    type: b1
  - id: pcom_spi_fram
    type: b1
  - id: pcom_transceiver
    type: b1
  - id: pcom_dac
    type: b1
  - id: pcom_icp0
    type: b1
  - id: pcom_icp1
    type: b1
  - id: pcom_icp2
    type: b1
  - id: pcom_oscillator
    type: b1
  - id: pcom_temp1
    type: b1
  - id: pcom_temp2
    type: b1
  - id: pcom_reserved2
    type: b1
  - id: pcom_reserved3
    type: b1
  - id: pcom_reserved4
    type: b1
# DEVICE ERRORS
  - id: pcom_err_mcu
    type: b1
  - id: pcom_err_internal_flash
    type: b1
  - id: pcom_err_internal_sram
    type: b1
  - id: pcom_err_qspi_fram
    type: b1
  - id: pcom_err_spi_fram
    type: b1
  - id: pcom_err_transceiver
    type: b1
  - id: pcom_err_dac
    type: b1
  - id: pcom_err_icp0
    type: b1
  - id: pcom_err_icp1
    type: b1
  - id: pcom_err_icp2
    type: b1
  - id: pcom_err_oscillator
    type: b1
  - id: pcom_err_temp1
    type: b1
  - id: pcom_err_temp2
    type: b1
  - id: pcom_err_reserved1
    type: b1
  - id: pcom_err_reserved2
    type: b1
  - id: pcom_err_reserved3
    type: b1
# OTHER
  - id: pcom_signal_stre
    type: u1
  - id: pcom_last_packet_time
    type: b31
  - id: pcom_last_packet_bool
    type: b1	
  - id: pcom_dropped_packets
    type: u4
  - id: pcom_gs_packets
    type: u4
  - id: pcom_sent_packets
    type: u4
  - id: pcom_power_amp_temp
    type: u1
  - id: pcom_forward_rf_power
    type: s1
  - id: pcom_reflected_rf_power
    type: s1
  - id: pcom_temp_curr_1
    type: u1
  - id: pcom_temp_curr_2
    type: u1