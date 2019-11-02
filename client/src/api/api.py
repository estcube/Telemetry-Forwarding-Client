from flask import Flask, jsonify, request

from src.dbInterface import querylastentry, dataIntoDBtest
from src.conf import Configuration

app = Flask(__name__)


@app.route('/getdata', methods=['GET'])
def getdata():
    if (request.method == 'GET'):
        response = querylastentry()

        # return jsonify(response)
        return jsonify({"timestamp": response[0], "data": response[1]})
#
# @app.route('/post', methods=['POST'])
# def addConf():
#     some_json = request.get_json("Data")
#     print(some_json)
#     return jsonify(some_json), 201


@app.route('/getconf', methods=['GET'])
def getconf():
    if (request.method == 'GET'):
        configuration = Configuration("../../configuration.ini")
        response = Configuration.getAllConf(configuration)
        return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
