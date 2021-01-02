from datetime import datetime

from flask_restful import Resource


class TODOSimpleCRUD(Resource):

    def get(self):
        return {'todos': [
            {
                'task': 'Finish This',
                'when': datetime.timestamp(datetime.now()),
                'by': 'me',
                'done': False
            },
            {
                'task': 'Goto the Supermarket',
                'when': datetime.timestamp(datetime.now()),
                'by': 'me',
                'done': True
            },
            {
                'task': 'Implement from Database',
                'when': datetime.timestamp(datetime.now()),
                'by': 'someone',
                'done': False
            },
        ]}, 200

    def post(self):
        return {'status': 'this should be a post'}, 200

    def update(self):
        return {
            'todo': {
                'task': 'Implement from Database',
                'when': datetime.timestamp(datetime.now()),
                'by': 'someone',
                'done': True
            },
        }, 200

    def delete(self):
        return { 'status': 'deleted! Well, will soon' }, 200