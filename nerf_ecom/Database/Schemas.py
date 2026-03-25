from pydantic import BaseModel
from datetime import datetime

class create_order(BaseModel):
    customer_name:str
    product_name:str
    quantity:int
    price:float

class orderUpdate(BaseModel):
    status:str

class order_response(create_order):
    id:int
    status:str
    create_at:datetime

    class config:
        from_attributes=True
