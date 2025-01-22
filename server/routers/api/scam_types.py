from fastapi import APIRouter, HTTPException
from db.database import db

router = APIRouter()

@router.get("/scam-types")
async def get_items():
    pipeline = [
        {"$unwind": "$details"},
        {
            "$group": {
                "_id": "$details.red_flag",
                "count": {"$sum": 1}
            }
        },
        {
            "$project": {
                "scam_type": "$_id",
                "count": 1,
                "_id": 0
            }
        }
    ]
    return list(db.messages.aggregate(pipeline))
