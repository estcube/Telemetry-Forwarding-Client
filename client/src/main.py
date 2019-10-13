from axListener import AXListener, AXFrame
from conf import Configuration
import kiss
import os
import logging

def printFrame(frame: AXFrame):
    print(frame)

def main():
    confPath = os.path.join(os.path.dirname(__file__), "../configuration.ini")

    conf = Configuration(confPath)

    logging.basicConfig()
    _logger = logging.getLogger(__name__)

    ax = AXListener()

    ax.addCallback(printFrame)

    k = kiss.TCPKISS(conf.getConf("TNC interface", "tnc-ip"), conf.getConf("TNC interface", "tnc-port"), strip_df_start=True)

    try:
        k.start()
    except ConnectionRefusedError:
        _logger.error("Could not initialize a TCP connection to %s:%s",
                conf.getConf("TNC interface", "tnc-ip"),
                conf.getConf("TNC interface", "tnc-port")
        )
        exit(-1)

    try:
        k.read(callback=ax.receive)
    except KeyboardInterrupt:
        pass
    k.stop()


if __name__ == "__main__":
    main()
