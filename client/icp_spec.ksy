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
  - id: data
    size: len
  - id: crc
    type: u2
enums:
  command:
    247: beacon_data