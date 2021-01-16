from flask import Blueprint
from flask_restful import Api

from .resources import TODOs, ObjectTODO


bp = Blueprint(__name__, 'api', url_prefix='/api')
api = Api(bp)

api.add_resource(TODOs, '/todo')
api.add_resource(ObjectTODO, '/todo/<string:_id>')

def init_app(app):
    app.register_blueprint(bp)