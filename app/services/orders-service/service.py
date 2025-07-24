from models import OrderCreate
from shared.schemas.models import Order
from typing import List

# In-memory storage
orders = {}
next_order_id = 1

def create_order(order_create: OrderCreate) -> Order:
    global next_order_id
    order = Order(id=next_order_id, user_id=order_create.user_id, product_ids=order_create.product_ids, status="created")
    orders[order.id] = order
    next_order_id += 1
    return order

def get_orders() -> List[Order]:
    return list(orders.values())
