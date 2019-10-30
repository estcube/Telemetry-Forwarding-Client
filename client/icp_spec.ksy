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
  - id: uuid
    size: 3
  - id: mode
    type: u1
  - id: data
    size: len
  - id: crc
    type: u2
