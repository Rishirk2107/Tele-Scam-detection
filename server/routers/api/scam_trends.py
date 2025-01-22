from fastapi import APIRouter, HTTPException
from db.database import db

router = APIRouter()

@router.get("/scam-trends")
async def get_items():
    pipeline = [
        {"$unwind": "$details"},
        {
            "$addFields": {
                "converted_timestamp": {
                    "$dateFromString": {
                        "dateString": "$timestamp",
                        "format": "%Y-%m-%d %H:%M:%S"  # Adjusted format for your timestamp
                    }
                }
            }
        },
        {
            "$group": {
                "_id": {
                    "scam_type": "$details.red_flag",
                    "date": {"$dateToString": {"format": "%Y-%m-%d", "date": "$converted_timestamp"}}
                },
                "count": {"$sum": 1}
            }
        },
        {
            "$project": {
                "scam_type": "$_id.scam_type",
                "date": "$_id.date",
                "count": 1,
                "_id": 0
            }
        }
    ]
    try:
        return list(db.messages.aggregate(pipeline))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
