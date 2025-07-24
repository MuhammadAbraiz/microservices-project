from pydantic import BaseModel
from typing import List

class User(BaseModel):
    id: int
    username: str

class Product(BaseModel):
    id: int
    name: str
    price: float

class Order(BaseModel):
    id: int
    user_id: int
    product_ids: List[int]
    status: str
