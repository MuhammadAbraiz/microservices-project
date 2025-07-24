from .models import ProductCreate
from ...shared.schemas.models import Product
from typing import List

# In-memory storage
products = {}
next_product_id = 1

def create_product(product_create: ProductCreate) -> Product:
    global next_product_id
    product = Product(id=next_product_id, name=product_create.name, price=product_create.price)
    products[product.id] = product
    next_product_id += 1
    return product

def get_products() -> List[Product]:
    return list(products.values())
