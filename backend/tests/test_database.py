from os import getenv
from json import dumps, loads

from dotenv import load_dotenv
from pymongo import MongoClient

from backend.database import DatabaseWrapper


def setup():
    load_dotenv()

    try:
        collection = MongoClient(getenv('MONGO_URI'))['todos']['test']
        collection.delete_many({})
    except Exception as e:
        print("There was an error Setting Up:", e)

def teardown():
    load_dotenv()

    try:
        collection = MongoClient(getenv('MONGO_URI'))['todos']['test']
        collection.delete_many({})
    except Exception as e:
        print("There was an error Tearing Down:", e)

def test_database_connect():
    instance = DatabaseWrapper('test')

    assert instance.collection != None

def test_database_insert():
    setup()

    instance = DatabaseWrapper(collection='test')
    result = instance.insert({'task': 'Test this guy'})

    assert result != None
    assert dumps(result)

    teardown()

def test_database_search():
    setup()

    instance = DatabaseWrapper(collection='test')
    _ = instance.insert({'task': 'Test this guy'})

    result = instance.search({'task': 'Test this guy'})
    result = loads(result)

    assert result != None
    assert len(result) == 1
    assert result[0]['task'] == 'Test this guy'

    teardown()

def test_database_update():
    setup()

    instance = DatabaseWrapper(collection='test')
    _ = instance.insert({'task': 'Test this guy'})

    instance.update({'task': 'Test this guy'}, {'by': 'me'})
    result = instance.search({'task': 'Test this guy'})
    result = loads(result)

    assert result != None
    assert len(result) == 1
    assert result[0]['task'] == 'Test this guy'
    assert result[0]['by'] == 'me'

    teardown()

def test_database_delete():
    setup()

    instance = DatabaseWrapper(collection='test')
    _ = instance.insert({'task': 'Test this guy'})

    instance.delete({'task': 'Test this guy'})
    result = instance.search({'task': 'Test this guy'})
    result = loads(result)

    assert result == []

    teardown()
    