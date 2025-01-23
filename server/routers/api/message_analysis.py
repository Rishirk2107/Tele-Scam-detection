from fastapi import APIRouter, HTTPException
from db.database import db

router = APIRouter()

@router.get("/message-analysis")
async def get_items1():
    pipeline = [
        {
            "$addFields": {
                "date": {
                    "$dateToString": {
                        "format": "%Y-%m-%d",
                        "date": { "$toDate": "$timestamp" }  # Convert string to Date
                    }
                }
            }
        },
        {
            "$group": {
                "_id": "$date",  # Group by date
                "no_of_messages": { "$sum": 1 },  # Count total messages
                "scam_messages": {
                    "$sum": { "$cond": [{ "$eq": ["$red_flag_found", True] }, 1, 0] }  # Count scam messages
                }
            }
        },
        {
            "$project": {
                "_id": 0,  # Exclude _id
                "date": "$_id",  # Include date
                "no_of_messages": 1,
                "scam_messages": 1
            }
        },
        {
            "$sort": { "date": -1 }  # Sort by date (newest first)
        }
    ]
    return list(db.messages.aggregate(pipeline))    