from fastapi import APIRouter
from . import service
from .models import OrderCreate
from ...shared.schemas.models import Order
from typing import List

router = APIRouter()

@router.post("/orders", response_model=Order)
def create_order(order: OrderCreate):
    return service.create_order(order)

@router.get("/orders", response_model=List[Order])
def get_orders():
    return service.get_orders()

@router.get("/healthz")
def healthz():
    return {"status": "ok"}
