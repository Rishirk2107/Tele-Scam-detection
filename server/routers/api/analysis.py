from fastapi import APIRouter, HTTPException, Query
from db.database import db
from datetime import datetime

router = APIRouter()

collection = db["messages"]

@router.get("/analysis")
async def message_analysis(date: str = Query(..., description="Date in the format YYYY-MM-DD")):
    try:
        # Convert date string to datetime objects
        start_of_day = datetime.strptime(date, "%Y-%m-%d")
        end_of_day = start_of_day.replace(hour=23, minute=59, second=59)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")

    # MongoDB aggregation pipeline
    pipeline = [
        {
            "$match": {
                "timestamp": {
                    "$gte": start_of_day.strftime("%Y-%m-%d %H:%M:%S"),
                    "$lte": end_of_day.strftime("%Y-%m-%d %H:%M:%S"),
                }
            }
        },
        {
            "$group": {
                "_id": None,
                "total_messages": {"$sum": 1},
                "scam_messages": {"$sum": {"$cond": [{"$eq": ["$red_flag_found", True]}, 1, 0]}}
            }
        }
    ]
    
    # Execute aggregation
    result = list(collection.aggregate(pipeline))
    
    # Handle no results
    if not result:
        return {"total_messages": 0, "scam_messages": 0}
    
    # Extract counts from the result
    counts = result[0]
    return {
        "total_messages": counts["total_messages"],
        "scam_messages": counts["scam_messages"]
    }