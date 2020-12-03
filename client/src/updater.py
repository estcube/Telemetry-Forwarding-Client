"""
Provides methods to check for new versions and update files
"""

import requests
import pickle
import urllib
import logging
from conf import Configuration


def downloadAndReplaceFile(path, download_url):
    """
        Downloads a new file and replaces the current
    """
    file = urllib.request.urlopen(download_url)
    with open(path, 'wb') as output:
        output.write(file.read())


def getCurrentVersions():
    """
        Fetches the currents versions of files
    """
    f = open('../versions.pckl', 'rb')
    versions = pickle.load(f)
    f.close()
    return versions


class Updater:
    """ Class that manages updating grafana dashboard files and kaitai files"""

    _logger = logging.getLogger(__name__)

    def __init__(self, config: Configuration):
        self.config = config
        self.versions = getCurrentVersions()

    def checkForUpdates(self):
        """
            Check for updates by connecting to an endpoint which returns the latest versions
        """
        url = self.config.get_conf("Client", "versions-url")
        try:
            response = requests.get(url)
            if 200 <= response.status_code <= 300:
                data = response.json()
                self.updateGrafana(data)
                self.updateKaitai(data)
                self.updateVersions()
            else:
                self._logger.warning("Connection failed to version check endpoint %s", url)
        except requests.ConnectionError:
            self._logger.warning("Connection failed to version check endpoint %s", url)
        except requests.Timeout:
            self._logger.warning("Connection to version check endpoint %s timed out.", url)
        except requests.RequestException:
            self._logger.warning("Something went wrong with the version check %s request.", url)
        except Exception as exc:
            self._logger.warning("Something went wrong with the version check %s request.", url)
            raise exc

    def updateVersions(self):
        """
            Stores to new versions after updating
        """
        f = open('../versions.pckl', 'wb')
        pickle.dump(self.versions, f)
        f.close()

    def updateGrafana(self, data):
        """
            Updates the grafana.db fail to display updates dashboards
        """
        try:
            if data["grafana"]["version"] != self.versions["grafana"]["version"]:
                downloadAndReplaceFile("../grafana/data/grafana.db", data["grafana"]["download"])
                self.versions["grafana"]["version"] = data["grafana"]["version"]
                self._logger.info("Grafana updated to version: " + data["grafana"]["version"])
        except Exception as e:
            self._logger.error("Failed to update Grafana configuration due to an exception: " + str(e))

    def updateKaitai(self, data):
        """
            Updates the kaitai files to respond to changes in packet configuration
        """
        current_kaitai_files = {}

        for kaitai_file in self.versions["kaitai"]:
            current_kaitai_files[kaitai_file["name"]] = kaitai_file["version"]

        for kaitai_file in data["kaitai"]:
            try:
                if kaitai_file["name"] not in current_kaitai_files or kaitai_file["version"] != current_kaitai_files[kaitai_file["name"]]:
                    downloadAndReplaceFile(kaitai_file["name"], kaitai_file["download"])
                    self.versions["kaitai"][kaitai_file] = {}
                    self.versions["kaitai"][kaitai_file]["version"] = kaitai_file["version"]
                    self._logger.info("Kaitai file " + kaitai_file["name"] + " updated to version: " + data["grafana"]["version"])
            except Exception as e:
                self._logger.error("Failed to update kaitai file " + kaitai_file["name"] + " due to an exception: " + str(e))



