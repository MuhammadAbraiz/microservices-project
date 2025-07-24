import pytest
from fastapi.testclient import TestClient
from ..app import app

client = TestClient(app)

def test_healthz():
    response = client.get("/healthz")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_create_order():
    response = client.post("/orders", json={"user_id": 1, "product_ids": [1, 2]})
    assert response.status_code == 200
    assert response.json()["user_id"] == 1
