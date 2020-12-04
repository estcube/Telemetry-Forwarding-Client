"""
Small util functions for the telemetry client.
"""

import sys
import os


def get_root():
    """
    Returns the path to the root client folder.

    If the application is packaged into an exe, returns the path to the folder that contains the
    executable.

    Otherwise, expects that the file is a script inside the `client/src` folder.
    """

    if getattr(sys, "frozen", False):
        return os.path.dirname(sys.executable)
    else:
        return os.path.dirname(os.path.abspath(__file__))
