import pytest
from backend.app import create_app, create_app_minimal


@pytest.fixture(scope="module")
def app_minimal():
    return create_app_minimal()

@pytest.fixture(scope="module")
def app():
    return create_app()