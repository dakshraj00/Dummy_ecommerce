from sqlalchemy import Column,String,Integer,Float,DateTime,ForeignKey
from .database import Base
from datetime import datetime
from sqlalchemy.sql import func
class Order(Base):
    __tablename__="orders"

    id=Column(Integer,primary_key=True,index=True)
    customer_name=Column(String,nullable=False)
    product_name=Column(String,nullable=False)
    quantity=Column(Integer,nullable=False)
    price=Column(Float,nullable=False)
    status = Column(String, default="pending")     # ADD THIS
    create_at = Column(DateTime, default=datetime.utcnow) 

class Incident(Base):
    __tablename__="incident"

    id =Column(Integer,primary_key=True,index=True)
    order_id=Column(Integer,ForeignKey("orders.id"))
    severity=Column(String)
    incident_type=Column(String,nullable=True)
    recommendation=Column(String,nullable=True)
    possible_cause=Column(String,nullable=True)
    severity=Column(String,nullable=False)
    detected_at=Column(DateTime(timezone=True),server_default=func.now())