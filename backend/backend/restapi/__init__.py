from flask import Blueprint
from flask_restful import Api

from .resources import TODOSimpleCRUD


bp = Blueprint(__name__, 'api', url_prefix='/api')
api = Api(bp)

api.add_resource(TODOSimpleCRUD, '/todo')

def init_app(app):
    app.register_blueprint(bp)