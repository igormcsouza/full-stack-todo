from os import getenv
from json import JSONEncoder
from bson import ObjectId

from dotenv import load_dotenv
from pymongo import MongoClient


load_dotenv()

class JSONEncoderDocument(JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return JSONEncoder.default(self, o)

class DatabaseWrapper:

    error_msg = lambda self, motive: f'There was an error on {motive}, is the {motive} plausable?'

    def __init__(self, collection: str):
        try:
            self.collection = MongoClient(
                getenv('MONGO_URI'))['todos'][collection]
        except Exception as e:
            print('There is an erro connecting to the database', e)

    @staticmethod
    def encode(o: dict) -> str:
        return JSONEncoderDocument().encode(o)

    def search(self, query):
        try:
            result = list(self.collection.find(query))
        except Exception as e:
            print(self.error_msg('query'), e)
        
        return self.encode(result)

    def insert(self, todo):
        try:
            result = self.collection.insert_one(todo).inserted_id
        except Exception as e:
            print(self.error_msg('insert'), e)

        return str(result)

    def update(self, query, todo):
        try:
            self.collection.update_one(query, { "$set": todo })
        except Exception as e:
            print(self.error_msg('update'), e)

    def delete(self, query):
        try:
            self.collection.delete_one(query)
        except Exception as e:
            print(self.error_msg('delete'), e)