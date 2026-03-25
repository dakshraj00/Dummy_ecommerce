from langchain_core.tools import tool
from sqlalchemy import text
from Database.database import engine


@tool
def get_summary():
    """
    Returns the count of orders grouped by status.
    """

    with engine.connect() as cn:
        result = cn.execute(text("""
            SELECT status, COUNT(*)
            FROM orders
            GROUP BY status
        """))

        rows = result.fetchall()

        summary = {row[0]: row[1] for row in rows}
        total = sum(summary.values())

    return {
        "table": "orders",
        "metric": "order_status_summary",
        "total_orders": total,
        "status_counts": summary
    }


@tool
def get_cancellation(month: int, year: int):
    """
    get all the recent cancelled orders in a month or a year
    """

    with engine.connect() as conn:

        result = conn.execute(
            text("""
                SELECT COUNT(*)
                FROM orders
                WHERE status = 'cancelled'
                AND EXTRACT(MONTH FROM create_at) = :month
                AND EXTRACT(YEAR FROM create_at) = :year
            """),
            {"month": month, "year": year}
        )

        count = result.scalar()
        # print(f"RESULT FROM DB → {count}")

        return {
            "month": month,
            "year": year,
            "cancellation": count
        }

@tool
def get_incident(month:int,year:int):
    """"
    Fetch incidents for a specific month and year.
    
    """
    with engine.connect() as conn:
        result=conn.execute(text
            ("""
                SELECT incident_type, severity, COUNT(*) AS total
                FROM incident
                WHERE EXTRACT(MONTH FROM detected_at) = :month
                AND EXTRACT(YEAR FROM detected_at) = :year
                GROUP BY incident_type, severity
            """),
            {'month':month,'year':year}
            )
            
        rows = result.fetchall()
    if not rows:
        return {
            "incidents": [],
            "summary": "No incidents were recorded for this period."
        }
    print("TOOL OUTPUT:", rows)

    return {
        "month": month,
        "year": year,
        "incidents": [
            {
                "incident_type": r[0],
                "severity": r[1],
                "count": r[2]
            }
            for r in rows
        ]
    }