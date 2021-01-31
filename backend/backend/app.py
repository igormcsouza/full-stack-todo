from flask import Flask, jsonify

from . import restapi
from .extensions import cors


def create_app_minimal():
    app = Flask(__name__)

    return app

def create_app():
    app = create_app_minimal()

    @app.route('/')
    def health():
        return jsonify({ 'status': 'Good' })

    restapi.init_app(app)
    cors.init_app(app)

    return app