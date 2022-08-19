import reignmakers
from flask import Flask

class API():
    def __init__(self):
        self.rm = reignmakers.Reignmakers()
        self.app = Flask(__name__)

        @self.app.route('/api/marketplace', methods=['GET'])
        def marketplace():
            return self.rm.get_marketplace()
