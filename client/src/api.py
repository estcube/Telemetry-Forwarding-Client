"""
Provides an web api for querying the telemetry data and configuration parameters
and setting the configuration parameters through the frontend.

Does not include any authentication, so should not be open to the external network.
"""

import os
import json
from datetime import datetime
from flask import Flask, jsonify, send_file, send_from_directory, request
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from db_interface import TelemetryDB

# from db_interface import TelemetryDB
from conf import Configuration


def create_app(config: Configuration, static_folder: str) -> Flask:
    """ Creates a flask app for the api. """

    db_loc = os.path.join(os.path.dirname(__file__), config.get_conf("Client", "database"))
    database = TelemetryDB(db_loc)

    app = Flask(__name__, static_url_path="", static_folder=static_folder)
    CORS(app)

    # swagger specific
    swagger_url = "/api/docs"
    api_url = "/api/static/swagger.yaml"
    swaggerui_blueprint = get_swaggerui_blueprint(
        swagger_url,
        api_url,
        config={
            "app_name": "Estcube 2 Telemetry API"
        }
    )
    app.register_blueprint(swaggerui_blueprint, url_prefix=swagger_url)
    # end swagger specific

    @app.route("/api/telemetry/packets", methods=["GET"])
    def get_packets():
        return {"packets": database.get_telemetry_data()}

    @app.route("/api/telemetry/configuration")
    def get_telemetry_configuration():
        path = os.path.join(os.path.dirname(__file__),
                config.get_conf("Client", "telemetry-configuration"))
        file = open(path, "r", encoding="utf-8")
        tel_conf = file.read()
        file.close()
        return json.loads(tel_conf)

    @app.route("/api/data", methods=["GET"])
    def getdata():
        """ Test function. """
        return jsonify({"timestamp": datetime.now(), "data": {"some dats": "dat"*3}})

    @app.route("/api/conf", methods=["GET"])
    def getconf():
        """ Returns the whole current configuration object. """
        res = config.get_all_conf()
        return jsonify(res)

    @app.route("/api/conf/constraints", methods=["GET"])
    def get_constraints():
        """ Returns all of the constraints for the configuration. """
        constrs = config.get_constraints()
        return jsonify(constrs)

    @app.route("/api/conf/full", methods=["GET"])
    def get_full_conf():
        res = config.get_conf_with_constraints()
        return res

    @app.route("/", methods=["GET"])
    def get_index():
        return send_file(os.path.join(static_folder, "index.html"))

    @app.errorhandler(404)
    def not_found(e):
        return send_file(os.path.join(static_folder, "index.html"))

    @app.route('/api/static/<path:path>')
    def send_static(path):
        return send_from_directory('static', path)

    @app.route('/api/conf', methods=["POST"])
    def set_conf():
        some_json = request.get_json()
        for i in some_json:
            for j in some_json[i]:
                config.set_conf(section=i, element=j, value=some_json[i][j])

        return jsonify(some_json), 200

    return app



# # @app.route('/post', methods=['POST'])
# # def addConf():
# #     some_json = request.get_json("Data")
# #     print(some_json)
# #     return jsonify(some_json), 201


if __name__ == '__main__':
    CONF_PATH = os.path.join(os.path.dirname(__file__), "../configuration.ini")
    STATIC_PATH = os.path.join(os.path.dirname(__file__), "../static")
    APP = create_app(Configuration(CONF_PATH), STATIC_PATH)
    APP.run(debug=True)
