""" Hook to start Grafana server """

import subprocess

subprocess.Popen([r"grafana/bin/grafana-server.exe", "--homepath=grafana"])
