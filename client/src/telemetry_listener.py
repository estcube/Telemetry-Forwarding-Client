
import logging
from typing import Callable
from ax_listener import AXFrame
from icp import Icp

class TelemetryListener():
    def __init__(self):
        self.callbacks = []

    def add_callback(self, callback: Callable) -> int:
        if not callable(callback):
            raise ValueError("Cannot add a callback that is not callable.")
        self.callbacks.append(callback)
        return len(self.callbacks) - 1

    def receive(self, ax: AXFrame):
        icp = Icp.from_bytes(ax.info)

        if icp.cmd != Icp.Command.beacon_data:
            return

        # TODO: CRC control
