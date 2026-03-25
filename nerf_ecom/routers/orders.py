from fastapi import APIRouter,Depends
from Database import database
from Database import Schemas
from sqlalchemy.orm import Session
from Database import models
from detectors.detector import detect_incident
from detectors.analyzer import analyze
from Database.models import Incident
router=APIRouter()

def get_db():
    db=database.Session_maza()
    try:
        yield db
    finally:
        db.close()

@router.post("/orders",response_model=Schemas.order_response)
def create_order(order:Schemas.create_order,db:Session=Depends(get_db)):
    new_order=models.Order(**order.dict())
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    

    incident_type=detect_incident(new_order)
    if incident_type:
        analysis=analyze(incident_type,new_order)

        incident=Incident(
            order_id=new_order.id,
            severity=analysis['severity'],
            incident_type=incident_type,
            recommendation=analysis['recommendation'],
            possible_cause=analysis['possible_cause']
        )
        db.add(incident)
        db.commit()
        db.refresh(incident)

    return new_order


@router.get("/orders",response_model=list[Schemas.order_response])
def get_all(skip:int=0,limit:int=10,db:Session=Depends(get_db)):
    orders=db.query(models.Order).offset(skip).limit(limit).all()
    return orders

@router.get("/orders/{order_id}",response_model=Schemas.order_response)
def get_order(order_id:int,db:Session=Depends(get_db)):
    order=db.query(models.Order).filter(models.Order.id==order_id).first()
    if not order:
        return "order not found"
    return order

@router.put("/orders/{id}",response_model=Schemas.order_response)
def update_order(id:int,order_status:Schemas.orderUpdate,db:Session=Depends(get_db)):
    order=db.query(models.Order).filter(models.Order.id==id).first()
    if not order :
        return "order not found"
    order.status=order_status.status
    db.commit()
    db.refresh(order)
    return order

@router.delete("/orders/{id}",response_model=Schemas.order_response)
def order_delete(id:int,db:Session=Depends(get_db)):
    order=db.query(models.Order).filter(models.Order.id==id).first()
    if not order :
        return "order not found"
    db.delete(order)
    db.commit()
    
    return order