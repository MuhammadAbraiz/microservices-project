import pytest
from fastapi.testclient import TestClient
from ..app import app

client = TestClient(app)

def test_healthz():
    response = client.get("/healthz")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_create_product():
    response = client.post("/products", json={"name": "test product", "price": 10.0})
    assert response.status_code == 200
    assert response.json()["name"] == "test product"
