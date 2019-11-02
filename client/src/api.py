"""
Provides an web api for querying the telemetry data and configuration parameters
and setting the configuration parameters through the frontend.

Does not include any authentication, so should not be open to the external network.
"""

import os
from datetime import datetime
from flask import Flask, jsonify

# from db_interface import TelemetryDB
from conf import Configuration

def create_app(config: Configuration) -> Flask:
    """ Creates a flask app for the api. """
    app = Flask(__name__)

    @app.route("/data", methods=["GET"])
    def getdata():
        """ Test function. """
        return jsonify({"timestamp": datetime.now(), "data": {"some dats": "dat"*3}})

    @app.route("/conf", methods=["GET"])
    def getconf():
        """ Returns the whole current configuration object. """
        res = config.get_all_conf()
        return jsonify(res)

    @app.route("/conf/constraints", methods=["GET"])
    def get_constraints():
        """ Returns all of the constraints for the configuration. """
        constrs = config.get_constraints()
        return jsonify(constrs)

    return app

# # @app.route('/post', methods=['POST'])
# # def addConf():
# #     some_json = request.get_json("Data")
# #     print(some_json)
# #     return jsonify(some_json), 201

if __name__ == '__main__':
    CONF_PATH = os.path.join(os.path.dirname(__file__), "../configuration.ini")
    APP = create_app(Configuration(CONF_PATH))
    APP.run(debug=True)
