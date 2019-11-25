import random
from datetime import datetime, timedelta
from axFrameWriter import FrameBuilder

class BeaconGenerator:

    def __init__(self, source: str, dest: str):
        self.ax = FrameBuilder()
        self.ax.setDest(dest)
        self.ax.setSource(source)

    def get_voltage(self) -> bytearray:
        return random.randint(100, 255).to_bytes(1, "big")

    def get_temp(self) -> bytearray:
        return random.randint(20, 240).to_bytes(1, "big")

    

    def generate_normal_beacon(self) -> bytearray:
        offset = timedelta(minutes=random.randrange(7, 10))
        packet_timestamp = datetime.now() - offset

        f = bytearray()
        f += "N".encode("ascii")
        f += int(packet_timestamp.timestamp()).to_bytes(4, byteorder="big")
        f += self.get_voltage()
        f += random.randint(-100, 100).to_bytes(1, "big", signed=True)
        f += self.get_voltage()
        f += self.get_voltage()
        f += self.get_voltage()
        f += self.get_voltage()
        f += self.get_temp()
        f += self.get_temp()
        f += self.get_temp()
        f += self.get_temp()
        f += random.randint(-32000, 32000).to_bytes(2, "big", signed=True)
        f += random.randint(-100, 100).to_bytes(1, "big", signed=True)

        ph_res = 0x00
        ph_res |= random.randint(0, 3) << 6
        ph_res |= random.randint(0, 3) << 4
        ph_res |= random.randint(0, 3) << 2
        ph_res |= random.randint(0, 3)
        f.append(ph_res)

        f += random.randint(0, 255).to_bytes(1, "big")

        f += random.randint(0, 255).to_bytes(1, "big")

        f += random.randint(0, 255).to_bytes(1, "big")
        f += random.randint(0, 255).to_bytes(1, "big")
        f += random.randint(0, 255).to_bytes(1, "big")
        f += random.randint(0, 255).to_bytes(1, "big")

        return f

    def generate(self):
        beacon_data = self.generate_normal_beacon()

        f = bytearray()
        f.append(0x01)
        f.append(0x02)
        f.append(len(beacon_data))
        f.append(0xF7)
        f += random.randint(0, 16777214).to_bytes(3, "big")
        f.append(0x03) # TODO Mode: NOW
        f += beacon_data
        f.append(0x05) # TODO CRC
        f.append(0x05)

        self.ax.setInfo(f)
        return self.ax.build()
