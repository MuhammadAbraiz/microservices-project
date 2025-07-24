import pytest
from fastapi.testclient import TestClient
from ..app import app

client = TestClient(app)

def test_healthz():
    response = client.get("/healthz")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_signup():
    response = client.post("/signup", json={"username": "testuser", "password": "password"})
    assert response.status_code == 200
    assert response.json()["username"] == "testuser"
