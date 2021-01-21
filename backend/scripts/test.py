import os


def testing_pipeline():
    tests = [
        {
            'msg': 'Running Pytest',
            'task': lambda : os.system('pytest -vv --durations=1 .'),
            'result': True
        }
    ]

    for each in tests:
        print(each.get('msg'))
        each['result'] = each.get('task')() == 0

    try:
        assert all(list(map(lambda x: x.get('result'), tests))) == True, 'One of the test failed! Please, check it!'
    except Exception as e:
        print(f'Testing Pipeline failed: {e}')