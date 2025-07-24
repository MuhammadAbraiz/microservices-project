from fastapi import APIRouter
from . import service
from .models import ProductCreate
from ...shared.schemas.models import Product
from typing import List

router = APIRouter()

@router.post("/products", response_model=Product)
def create_product(product: ProductCreate):
    return service.create_product(product)

@router.get("/products", response_model=List[Product])
def get_products():
    return service.get_products()

@router.get("/healthz")
def healthz():
    return {"status": "ok"}
