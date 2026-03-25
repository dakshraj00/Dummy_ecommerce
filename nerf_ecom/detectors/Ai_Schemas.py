from pydantic import BaseModel
from datetime import datetime

class Incident_response(BaseModel):
    order_id:int
    incident_type:str
    recommendation:str
    possible_cause:str
    severity:str
    detected_at:datetime

    class Config:
        from_attributes=True

class ai_response(BaseModel):
    order_id:int
    incident_type:str
    severity:str