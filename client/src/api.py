"""
Provides an web api for querying the telemetry data and configuration parameters
and setting the configuration parameters through the frontend.

Does not include any authentication, so should not be open to the external network.
"""

import sys
import os
import json
import subprocess
import logging
import requests
import util
from flask import Flask, jsonify, send_file, send_from_directory, request
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from tnc_pool import TNCPool
from db_interface import TelemetryDB
from sids_relay import SIDSRelay

# from db_interface import TelemetryDB
from conf import Configuration


def create_app(config: Configuration, tnc_pool: TNCPool, sids_relay: SIDSRelay) -> Flask:
    """ Creates a flask app for the api. """

    log = logging.getLogger(__name__)

    db_loc = os.path.join(util.get_root(), config.get_conf("Client", "database"))
    database = TelemetryDB(db_loc)

    static_folder = os.path.join(util.get_root(), config.get_conf("Client", "static-files-path"))

    app = Flask(__name__, static_url_path="", static_folder=static_folder)
    CORS(app)

    if str(config.get_conf("Client", "debug-log")) != "True":
        server_log = logging.getLogger("werkzeug")
        server_log.setLevel(logging.WARN)

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



    @app.route("/api/sids/status", methods=["GET"])
    def get_sids_status():
        return jsonify(sids_relay.get_status()), 200

    @app.route("/api/telemetry/packets", methods=["GET"])
    def get_packets():
        return {"packets": database.get_telemetry_data()}

    @app.route("/api/telemetry/configuration", methods=["GET"])
    def get_telemetry_configuration():
        path = os.path.join(util.get_root(), config.get_conf("Client", "telemetry-configuration"))
        with open(path, "r", encoding="utf-8") as file:
            tel_conf = file.read()
        return json.loads(tel_conf)

    @app.route("/api/update", methods=[ "POST" ])
    def post_update_telemetry_configuration():
        telconf_url = config.get_conf("Client", "telemetry-configuration-url")
        kaitai_url = config.get_conf("Client", "packet-structure-url")
        telconf_path = os.path.join(
            util.get_root(),
            config.get_conf("Client", "telemetry-configuration")
        )
        kaitai_path = os.path.join(
            util.get_root(),
            config.get_conf("Client", "kaitai-configuration")
        )

        try:
            tel_req = requests.get(telconf_url)
        except (requests.ConnectionError, requests.ConnectTimeout) as err:
            log.warning("Connection to telemetry configuration endpoint failed.")
            log.warning(err)
            return jsonify({
                "error": "Connection to telemetry configuration endpoint failed"
            }), 500

        if tel_req.status_code != 200:
            return jsonify({
                "error": "Request for the telemetry configuration failed",
                "statusCode": tel_req.status_code
            }), 500

        try:
            kaitai_req = requests.get(kaitai_url)
        except (requests.ConnectionError, requests.ConnectTimeout) as err:
            log.warning("Connection to kaitai configuration endpoint failed.")
            log.warning(err)
            return jsonify({
                "error": "Connection to kaitai configuration endpoint failed."
            }), 500
        if kaitai_req.status_code != 200:
            return jsonify({
                "error": "Request for the kaitai configuration failed.",
                "statusCode": kaitai_req.status_code
            }), 500

        with open(telconf_path, "w", encoding="utf-8") as tel_f:
            tel_f.write(tel_req.text)

        # TODO: Revert changes is compiling ksy fails?
        with open(kaitai_path, "w", encoding="utf-8") as kaitai_f:
            kaitai_f.write(kaitai_req.text)

        comp_path = os.path.join(
            util.get_root(),
            config.get_conf("Client", "kaitai-compiler-path")
        )
        if not os.path.isfile(comp_path):
            return jsonify({
                "error": "Telemetry conf updated. Cannot find kaitai-struct-compiler executable."
            }), 500

        args = (comp_path, "--target", "python", "--outdir", "src", "--python-package", "icp",
            "spec/icp.ksy"
        )
        p_open = subprocess.Popen(
            args,
            cwd=util.get_root(),
            stdout=subprocess.PIPE
        )
        exit_code = p_open.wait()

        if exit_code != 0:
            log.error(p_open.stdout.read())
            return jsonify({
                "error": "Telemetry conf updated. Kaitai file failed compilation.",
                "exitCode": exit_code
            }), 500

        return '', 204

    @app.route("/api/tnc/<name>/status", methods=["GET"])
    def get_tnc_connection_check(name: str):
        if tnc_pool is None:
            return jsonify({"error": "TNC Pool is not defined."}), 500

        res = tnc_pool.check_tnc(name)
        return jsonify({"name": name, "status": res.name}), 200

    @app.route("/api/tnc/Main/start", methods=["POST"])
    def post_tnc_main_start():
        if tnc_pool is None:
            return jsonify({"error": "TNC Pool is not defined."}), 500

        tnc_pool.connect_main_tnc()
        return '', 204

    @app.route("/api/tnc/<name>/stop", methods=["POST"])
    def post_tnc_connection_stop(name: str):
        if tnc_pool is None:
            return jsonify({"error": "TNC Pool is not defined."}), 500

        tnc_pool.stop_tnc(name)
        return '', 204

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
    def not_found(err):
        return send_file(os.path.join(static_folder, "index.html"))

    @app.route('/api/static/<path:path>')
    def send_static(path):
        return send_from_directory('static', path)

    @app.route('/api/conf', methods=["POST"])
    def post_set_conf():
        some_json = request.get_json()
        try:
            for i in some_json:
                for j in some_json[i]:
                    config.set_conf(section=i, element=j, value=some_json[i][j])
        except:
            _, error, _ = sys.exc_info()
            return jsonify({"Error": '{err}'.format(err=error)}), 500
        return jsonify(some_json), 200

    return app

if __name__ == '__main__':
    CONF_PATH = os.path.join(util.get_root(), "configuration.ini")
    conf = Configuration(CONF_PATH)
    STATIC_PATH = os.path.join(util.get_root(), conf.get_conf("Client", "static-files-path"))
    APP = create_app(conf, STATIC_PATH, None)
    APP.run(debug=True)
