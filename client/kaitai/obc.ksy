meta:
  id: obc
  endian: le
seq:
# DEVICE ENABLED
  - id: reserved
    type: b1
  - id: internal_flash
    type: b1
  - id: internal_sram
    type: b1
  - id: qspi_flash1
    type: b1
  - id: qspi_flash2
    type: b1
  - id: fmc_mram
    type: b1
  - id: spi_fram1
    type: b1
  - id: spi_fram2
    type: b1
  - id: spi_fram3
    type: b1
  - id: io_expander
    type: b1
  - id: fmc_mram_temp_sensor
    type: b1
  - id: qspi_flash_temp_sensor
    type: b1
  - id: io_expander_temp_sensor
    type: b1
  - id: rtc
    type: b1
  - id: current_adc
    type: b1
  - id: aocs1_gyro1
    type: b1
  - id: aocs1_gyro2
    type: b1
  - id: aocs1_magnet
    type: b1
  - id: aocs1_acc
    type: b1
  - id: aocs1_temp
    type: b1
  - id: aocs2_gyro1
    type: b1
  - id: aocs2_gyro2
    type: b1
  - id: aocs2_magnet
    type: b1
  - id: aocs2_acc
    type: b1
  - id: aocs2_temp
    type: b1
  - id: payload_bus
    type: b1
  - id: icp1_bus
    type: b1
  - id: icp2_bus
    type: b1
  - id: reaction1
    type: b1
  - id: reaction2
    type: b1
  - id: reaction3
    type: b1
  - id: oscillator
    type: b1	
# DEVICE ERRORS
  - id: err_mcu
    type: b1
  - id: err_internal_flash
    type: b1
  - id: err_internal_sram
    type: b1
  - id: err_qspi_flash1
    type: b1
  - id: err_qspi_flash2
    type: b1
  - id: err_fmc_mram
    type: b1
  - id: err_spi_fram1
    type: b1
  - id: err_spi_fram2
    type: b1
  - id: err_spi_fram3
    type: b1
  - id: err_io_expander
    type: b1
  - id: err_mram_temp
    type: b1
  - id: err_qspi_flash_temp
    type: b1
  - id: err_io_expander_temp
    type: b1
  - id: err_rtc
    type: b1
  - id: err_current_adc
    type: b1
  - id: err_aocs1_gyro1
    type: b1
  - id: err_aocs1_gyro2
    type: b1
  - id: err_aocs1_magnet
    type: b1
  - id: err_aocs1_acc
    type: b1
  - id: err_aocs1_temp
    type: b1
  - id: err_aocs2_gyro1
    type: b1
  - id: err_aocs2_gyro2
    type: b1
  - id: err_aocs2_magnet
    type: b1
  - id: err_aocs2_acc
    type: b1
  - id: err_aocs2_temp
    type: b1
  - id: err_payload_bus
    type: b1
  - id: err_icp1_bus
    type: b1
  - id: err_icp2_bus
    type: b1
  - id: err_reaction1
    type: b1
  - id: err_reaction2
    type: b1
  - id: err_reaction3
    type: b1
  - id: err_oscillator
    type: b1	
# TEMPERATURE
  - id: fmc_mram_temp_value
    type: u1
  - id: qspi_fram_temp
    type: u1
  - id: io_expander_temp
    type: u1