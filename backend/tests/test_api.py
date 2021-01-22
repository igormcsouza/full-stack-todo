from os import getenv
from json import loads
from random import randint
from datetime import datetime

import pytest
from dotenv import load_dotenv
from pymongo import MongoClient
from bson.objectid import ObjectId

from backend.database import DatabaseWrapper


load_dotenv()

def _setup(samples: bool=True):
    try:
        collection = MongoClient(getenv('MONGO_URI'))['todos']['main']
        collection.delete_many({})
    except Exception as e:
        print("There was an error Setting Up:", e)

    if samples:
        todos = [
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
        ]

        r = collection.insert_many(todos)

    return collection      

def teardown():
    try:
        collection = MongoClient(getenv('MONGO_URI'))['todos']['main']
        collection.delete_many({})
    except Exception as e:
        print("There was an error Tearing Down:", e)

def test_api_get_all(client):
    _ = _setup()

    r = client.get('/api/todo')

    assert r.status_code == 200
    assert 'todos' in r.json.keys()

def test_api_post_one(client):
    instance = _setup(samples=True)

    todo = {
        'task': 'Implement from Database',
        'when': str(datetime.timestamp(datetime.now())),
        'by': 'someone',
        'done': True
    }

    r = client.post(
        '/api/todo', 
        json=todo, 
        headers={ "Content-Type":"application/json" })

    assert r.status_code == 200
    assert r.json['msg'] == 'done'
    assert '_id' in r.json.keys()

    result = instance.find({'_id': ObjectId(r.json['_id'])})
    result = list(result)

    assert len(result) == 1
    assert result[0] == { '_id': ObjectId(r.json['_id']), **todo }

def test_api_get_one(client):
    instance = _setup()

    ids = list(instance.find({}))
    _id = str(ids[randint(0, len(ids) - 1)]['_id'])

    r = client.get(f'/api/todo/{_id}')

    assert r.status_code == 200
    assert 'todo' in r.json.keys()

    result = r.json['todo']

    assert len(result) == 1
    assert result[0]['_id'] == _id

def test_api_put_one(client):
    instance = _setup()

    ids = list(instance.find({}))
    _id = str(ids[randint(0, len(ids) - 1)]['_id'])
    
    r = client.put(
        f'/api/todo/{_id}', 
        json={ 'task': 'Updated!' }, 
        headers={ 'Content-type':'application/json' })

    assert r.status_code == 200
    assert 'msg' in r.json.keys()  

    result = list(instance.find({'_id': ObjectId(_id)}))

    assert result[0]['task'] == 'Updated!'

def test_api_delete(client):
    instance = _setup()

    ids = list(instance.find({}))
    _id = str(ids[randint(0, len(ids) - 1)]['_id'])

    r = client.delete(f'/api/todo/{_id}')

    assert r.status_code == 200
    assert r.json['msg'] == 'done'

    result = list(instance.find({'_id': ObjectId(_id)}))

    assert result == []