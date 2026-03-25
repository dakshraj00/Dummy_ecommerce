from datetime import datetime,timedelta,timezone
from .detector import detect_incident
from Database import models,database
from datetime import datetime,timedelta
db=database.db()
dborder=models.Order
def analyze(incident_type:str,order):

    if incident_type=='ORDER_DELAYED':
        return analyze_delay(order)
    if incident_type=="Cancelled":
        return analyze_cancellation(order)
    if incident_type=="HIGH_VALUE_ORDER":
        return analyze_high_value(order)



def analyze_delay(order):
    now=datetime.now(timezone.utc)
    delayed_order=(now-order.created_at).days

    severity="Medium"

    if delayed_order>5:
        severity="High"
    if delayed_order>7:
        severity='Critical'

    return{
        "severity":severity,
        "possible_cause": "Logistics or warehouse processing delay",
        "recommendation": "Check shipment status and notify customer"
    }

def analyze_cancellation(order,db):
    recent_cancellation=db.query(dborder).filter(
        dborder.id==order.id,
        dborder.status=="Cancelled",
        dborder.create_at>datetime.now()-timedelta(days=30)
    ).count()
    severity="Medium"
    if recent_cancellation>3:
        severity="High"
    possible_cause = "Customer dissatisfaction or stock issue"
    if recent_cancellation>5:
        possible_cause+="Frequent cancellation deteceted"
    return{
        "severity":severity,
        "possible_caluse":possible_cause,
        "recommendation": "Review cancellation reasons and notify support team"
    }

def analyze_high_value(order):
    severity="high"
    if order.price>100:
        severity="High"
    return {
        "severity":severity,
        "possible_cause":"potential risk or may be fraud",
        "recommendation": "Verify payment method and confirm customer identity",

    } 
    