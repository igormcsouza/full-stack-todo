from flask import Flask, jsonify

def create_app_minimal():
    app = Flask(__name__)

    return app

def create_app():
    app = create_app_minimal()

    @app.route('/')
    def health():
        return jsonify({ 'status': 'Good' })

    return app