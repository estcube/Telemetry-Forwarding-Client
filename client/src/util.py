import sys
import os

def get_root():
    if getattr(sys, 'frozen', False):
        return sys.executable
    else:
        return os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
