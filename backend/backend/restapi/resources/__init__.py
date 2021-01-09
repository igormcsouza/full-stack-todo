from datetime import datetime

from flask import abort
from flask_restful import Resource, reqparse
from bson.objectid import ObjectId

from ...database import DatabaseWrapper


db = DatabaseWrapper('main')
class TODOs(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('task', type=str, help='Task Objective', required=True)
    parser.add_argument('when', type=str, help='Task deadline')
    parser.add_argument('by', type=str, help='Who is going to do it')
    parser.add_argument('done', type=bool, help='If task is done or not')

    def get(self):
        try:
            todos = db.search({})
        except Exception as e:
            abort(500, f'Internal Error: {e}')

        return { 'todos': todos }, 200

    def post(self):
        args = self.parser.parse_args()

        try:
            _id = db.insert(args)
        except Exception as e:
            abort(500, f'Internal Error: {e}')

        return {'msg': 'done', '_id': _id}, 200
class ObjectTODO(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('task', type=str, help='Task Objective', required=True)
    parser.add_argument('when', type=str, help='Task deadline')
    parser.add_argument('by', type=str, help='Who is going to do it')
    parser.add_argument('done', type=bool, help='If task is done or not')

    def get(self, _id):
        try:
            todo = db.search({'_id': ObjectId(_id)})
        except Exception as e:
            abort(500, f'Internal Error: {e}')

        return { 'todo': todo }, 200

    def put(self, _id):
        args = self.parser.parse_args()

        try:
            db.update({ '_id': ObjectId(_id) }, args)
        except Exception as e:
            abort(500, f'Internal Error: {e}')

        return { 'msg': 'done' }, 200

    def delete(self, _id):
        try:
            db.delete({ '_id': ObjectId(_id) })
        except Exception as e:
            abort(500, f'Internal Error: {e}')

        return { 'msg': 'done' }, 200