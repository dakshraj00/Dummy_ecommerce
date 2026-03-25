from datetime import datetime,timezone,timedelta

DAYS=3
PRICE_THRESHOLD=5000
def detect_incident(order):

    if order.status=="Cancelled":
        return 'ORDER_CANCELLED'
    
    if order.status=="Pending":
        if is_incident(order.create_at):
            return 'ORDER_DELAYED'
    
    elif order.price>=PRICE_THRESHOLD:
        return "HIGH_VALUE_ORDER"
    
    

def is_incident(created_at:datetime)->bool:

    now=datetime.now(timezone.utc)

    return now-created_at>timedelta(days=DAYS)