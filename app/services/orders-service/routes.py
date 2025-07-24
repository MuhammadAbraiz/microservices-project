from fastapi import APIRouter, Query
import service
from models import OrderCreate
from shared.schemas.models import Order
from typing import List, Optional

router = APIRouter()

@router.post("/orders", response_model=Order)
def create_order(order: OrderCreate):
    return service.create_order(order)

@router.get("/orders", response_model=List[Order])
def get_orders(user_id: Optional[int] = Query(None)):
    return service.get_orders(user_id=user_id)

@router.get("/healthz")
def healthz():
    return {"status": "ok"}
