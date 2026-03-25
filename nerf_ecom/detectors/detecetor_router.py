from fastapi import APIRouter, Depends, HTTPException
from .Ai_Schemas import Incident_response
from Database import models
from sqlalchemy.orm import Session
from .detector import detect_incident
from Database.database import db
from .analyzer import analyze
from Database.models import Incident

drouter = APIRouter()


@drouter.get("/incident/{order_id}", response_model=Incident_response)
def incident(order_id: int, db: Session = Depends(db)):

    # Get order
    order = db.query(models.Order).filter(models.Order.id == order_id).first()

    if not order:
        raise HTTPException(status_code=404, detail="Order id not found")

    # Detect incident
    incident_type = detect_incident(order)

    if not incident_type:
        raise HTTPException(status_code=404, detail="No incident found")

    # Analyze incident
    analyzer_incident = analyze(incident_type, order)

    # Check if incident already exists
    existing_incident = db.query(Incident).filter(
        Incident.order_id == order.id,
        Incident.incident_type == incident_type
    ).first()

    # Create incident if not exists
    if not existing_incident:
        new_incident = Incident(
            order_id=order.id,
            incident_type=incident_type,
            severity=analyzer_incident['severity'],
            recommendation=analyzer_incident['recommendation'],
            possible_cause=analyzer_incident['possible_cause'],
        )

        db.add(new_incident)
        db.commit()
        db.refresh(new_incident)

        detected_time = new_incident.detected_at

    else:
        detected_time = existing_incident.detected_at

    return {
        "order_id": order.id,
        "incident_type": incident_type,
        "recommendation": analyzer_incident["recommendation"],
        "possible_cause": analyzer_incident['possible_cause'],
        "severity": analyzer_incident["severity"],
        "detected_at": detected_time
    }

@drouter.get("/incidents",response_model=list[Incident_response])
def all_incident(db: Session = Depends(db)):
    incidents = db.query(Incident).all()
    return incidents