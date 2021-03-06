meta:
  id: main_kaitai
  endian: le
  imports:
    - common
    - obc
    - aocs
    - pcom
    - scom
    - eps
    - sp
    - st
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
  - id: common_data
    type: common
  - id: spec_data
    type:
      switch-on: src
      cases:
        0: broad
        1: mcs
        2: com
        3: eps
        4: obcs
        5: st
        6: sp
        7: sp
        8: sp
        9: sp
        10: sp
        11: sp
        12: nodes
        13: invalid_mac
  - id: crc
    type: u2
types:
 broad:
  seq:
   - id: broad
     type: u1
 mcs:
  seq:
   - id: mcs
     type: u1
 com:
  seq:
   - id: pcom
     type: pcom
   - id: scom
     type: scom
 obcs:
  seq:
   - id: obc
     type: obc
   - id: aocs
     type: aocs
 nodes:
  seq:
   - id: num
     type: u1
 invalid_mac:
  seq:
   - id: error
     type: u1