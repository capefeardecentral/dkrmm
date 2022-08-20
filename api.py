import reignmakers
from flask import Flask, request, make_response

class API():
    def __init__(self):
        self.rm = reignmakers.Reignmakers()
        self.app = Flask(__name__)

        @self.app.route('/api/marketplace', methods=['GET'])
        def marketplace():
            if request.method == "OPTIONS":
                return self._build_cors_preflight_response()
            else:
                return self._corsify_actual_reponse(make_response(self.rm.get_marketplace()))

    def _build_cors_preflight_response(self):
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        response.headers.add('Access-Control-Max-Age', '1728000')
        return response

    def _corsify_actual_reponse(self, response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response