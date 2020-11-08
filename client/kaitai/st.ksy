meta:
  id: st
  endian: le
seq:
# DEVICE ENABLED
  - id: reserved
    type: b1
  - id: internal_flash
    type: b1
  - id: internal_sram
    type: b1
  - id: camera
    type: b1
  - id: fpga
    type: b1
  - id: spi_fram
    type: b1
  - id: spi_flash
    type: b1
  - id: sdram
    type: b1
  - id: temp_sensor
    type: b1
  - id: reserved1
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
  - id: reserved7
    type: b1
# DEVICE ERRORS
  - id: err_mcu
    type: b1
  - id: err_internal_flash
    type: b1
  - id: err_internal_sram
    type: b1
  - id: err_camera
    type: b1
  - id: err_fpga
    type: b1
  - id: err_spi_fram
    type: b1
  - id: err_spi_flash
    type: b1
  - id: err_sdram
    type: b1
  - id: err_temp_sensor
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
  - id: err_reserved6
    type: b1
  - id: err_reserved7
    type: b1
# OTHER
  - id: fpga_temp
    type: u2
  - id: sensor_temp
    type: u2