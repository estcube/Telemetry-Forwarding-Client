"""Main entrypoint file for the Telemetry decoder."""

import os
import sys
import logging
import kiss
from ax_listener import AXListener, AXFrame
from conf import Configuration


def print_frame(frame: AXFrame):
    """Debug function that just prints the AXFrame object emitted by the AXListener."""
    print(frame)


def main():
    """Main loop function."""

    conf_path = os.path.join(os.path.dirname(__file__), "../configuration.ini")

    conf = Configuration(conf_path)

    logging.basicConfig()
    _logger = logging.getLogger(__name__)

    ax_listener = AXListener()

    ax_listener.add_callback(print_frame)

    k = kiss.TCPKISS(
        conf.get_conf("TNC interface", "tnc-ip"),
        conf.get_conf("TNC interface", "tnc-port"), strip_df_start=True
        )

    try:
        k.start()
    except ConnectionRefusedError:
        _logger.error(
            "Could not initialize a TCP connection to %s:%s",
            conf.get_conf("TNC interface", "tnc-ip"),
            conf.get_conf("TNC interface", "tnc-port")
            )
        sys.exit(-1)

    try:
        k.read(callback=ax_listener.receive)
    except KeyboardInterrupt:
        pass
    k.stop()


if __name__ == "__main__":
    main()
