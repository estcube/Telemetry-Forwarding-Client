"""
Provides methods to check for new versions and update files
"""

import requests
import pickle
import urllib
import logging
from conf import Configuration
from os import path


def downloadAndReplaceFile(file_path, download_url):
    """
        Downloads a new file and replaces the current
    """
    file = urllib.request.urlopen(download_url)
    with open(file_path, 'wb') as output:
        output.write(file.read())


class Updater:
    """ Class that manages updating grafana dashboard files and subsystems files"""

    _logger = logging.getLogger(__name__)

    def __init__(self, config: Configuration):
        self.config = config
        self.mission_name = self.config.get_conf("Mission Control", "mission-name")
        self.versions = self.getCurrentVersions()

    def getCurrentVersions(self):
        """
            Fetches the currents versions of files
        """
        if path.exists('../versions.pckl'):
            f = open('../versions.pckl', 'rb')
            versions = pickle.load(f)
            f.close()
        else:
            versions = {"subsystems": {}, "grafana": {}}
        return versions

    def checkForUpdates(self):
        """
            Check for updates by connecting to an endpoint which returns the latest versions
        """
        url = self.config.get_conf("Client", "versions-url")
        try:
            self._logger.info("Checking for updates...")
            response = requests.get(url)
            if 200 <= response.status_code <= 300:
                data = response.json()[self.mission_name]
                self.updateGrafana(data)
                self.updateSubSystems(data)
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
            self._logger.warning("Something went wrong with version updating: %s", str(exc))

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
            if "version" not in self.versions["grafana"] or self.mission_name + data["grafana"]["version"] != self.versions["grafana"]["version"]:
                downloadAndReplaceFile(self.config.get_conf("Client", "grafana-database"), data["grafana"]["link"])
                self.versions["grafana"]["version"] = self.mission_name + data["grafana"]["version"]
                self._logger.info("Grafana updated to version: " + data["grafana"]["version"])
        except Exception as e:
            self._logger.error("Failed to update Grafana configuration due to an exception: " + str(e))

    def updateSubSystems(self, data):
        """
            Updates the subsystems files to respond to changes in packet configuration
        """
        current_subsystems_files = {}

        for subsystems_filename in self.versions["subsystems"]:
            current_subsystems_files[subsystems_filename] = self.versions["subsystems"][subsystems_filename]

        for subsystems_filename in data["subsystems"]:
            subsystems_file = data["subsystems"][subsystems_filename]
            if subsystems_filename == "main":
                continue
            try:
                if subsystems_filename not in current_subsystems_files.keys() or self.mission_name + subsystems_file["version"] != current_subsystems_files[subsystems_filename]:
                    downloadAndReplaceFile(subsystems_filename + ".py", subsystems_file["python"])
                    self.versions["subsystems"][subsystems_filename] = {}
                    self.versions["subsystems"][subsystems_filename]["version"] = self.mission_name + subsystems_file["version"]
                    self._logger.info("subsystems file " + subsystems_filename + " updated to version: " + subsystems_file["version"])
            except Exception as e:
                self._logger.error("Failed to update subsystems file " + subsystems_filename + " due to an exception: " + str(e))



