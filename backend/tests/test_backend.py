from backend import __version__


def test_version():
    assert __version__ == '0.1.0'

def test_app_minimal(app_minimal):
    assert app_minimal.name == 'backend.app'

def test_app(app):
    assert app.name == 'backend.app'

def test_app_creation(client):
    r = client.get('/')

    assert r.status_code == 200
    assert r.json.get('status', '') == 'Good'
