from hk_obc import *
from numberGen import generate

class ObcData():
    def createData(self):
        hk_packet = bytearray(hk_obc_enabled(
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_obc_errors(
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]))
        hk_packet.extend(hk_obc_fmc_mram_temp(generate(40, 0, 100)))
        hk_packet.extend(hk_obc_qspi_fram_temp(generate(40, 0, 100)))
        hk_packet.extend(hk_obc_io_expander_temp(generate(40, 0, 100)))
        return hk_packet





