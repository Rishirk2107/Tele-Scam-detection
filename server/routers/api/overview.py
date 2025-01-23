from fastapi import APIRouter, HTTPException
from db.database import db

router = APIRouter()

@router.get("/overview")
async def get_items1():
    pipeline = [
        {
            "$facet": {
                "total_messages_analyzed": [{"$count": "count"}],
                "total_channels_analyzed": [
                    {"$group": {"_id": "$channel_id"}},
                    {"$count": "count"}
                ],
                "total_scam_channels_detected": [
                    {"$match": {"red_flag_found": True}},
                    {"$group": {"_id": "$channel_id"}},
                    {"$count": "count"}
                ],
                "total_scams": [
                    {"$unwind": "$details"},
                    {"$group": {"_id": "$details.red_flag", "count": {"$sum": 1}}}
                ]
            }
        },
        {
            "$project": {
                "total_messages_analyzed": {"$arrayElemAt": ["$total_messages_analyzed.count", 0]},
                "total_channels_analyzed": {"$arrayElemAt": ["$total_channels_analyzed.count", 0]},
                "total_scam_channels_detected": {"$arrayElemAt": ["$total_scam_channels_detected.count", 0]},
                "total_scams": "$total_scams"
            }
        }
    ]
    return list(db.messages.aggregate(pipeline))