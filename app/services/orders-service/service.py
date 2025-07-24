import os
import json
from models import OrderCreate
from shared.schemas.models import Order
from typing import List

ORDERS_FILE = 'orders.json'

# In-memory storage
orders = {}
next_order_id = 1

def load_orders():
    global orders, next_order_id
    if os.path.exists(ORDERS_FILE):
        with open(ORDERS_FILE, 'r') as f:
            data = json.load(f)
            orders.clear()
            for o in data.get('orders', []):
                orders[o['id']] = Order(**o)
            next_order_id = data.get('next_order_id', 1)

def save_orders():
    with open(ORDERS_FILE, 'w') as f:
        json.dump({
            'orders': [o.dict() for o in orders.values()],
            'next_order_id': next_order_id
        }, f)

# Load on startup
load_orders()

def create_order(order_create: OrderCreate) -> Order:
    global next_order_id
    order = Order(id=next_order_id, user_id=order_create.user_id, product_ids=order_create.product_ids, status="created")
    orders[order.id] = order
    next_order_id += 1
    save_orders()
    return order

def get_orders(user_id: int = None) -> List[Order]:
    if user_id is not None:
        return [o for o in orders.values() if o.user_id == user_id]
    return list(orders.values())
