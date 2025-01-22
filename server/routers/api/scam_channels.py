from fastapi import APIRouter, HTTPException
from bson import ObjectId
from bson.json_util import dumps
from db.database import db

router = APIRouter()

def convert_objectid(data):
    """
    Recursively convert ObjectId in a document or list of documents to string.
    """
    if isinstance(data, list):
        return [convert_objectid(item) for item in data]
    elif isinstance(data, dict):
        return {key: convert_objectid(value) for key, value in data.items()}
    elif isinstance(data, ObjectId):
        return str(data)
    return data

@router.get("/scam-channels")
async def get_items():
    try:
        pipeline = [
            {
                "$lookup": {
                    "from": "messages",
                    "localField": "channel_id",
                    "foreignField": "channel_id",
                    "as": "channel_messages"
                }
            },
            {
                "$project": {
                    "channel_name": 1,
                    "scam_score": 1,
                    "top_scam_type": {"$arrayElemAt": ["$red_flag", 0]},
                    "top_scammer": {"$arrayElemAt": ["$username", 0]},
                    "scam_messages": {
                        "$size": {
                            "$filter": {
                                "input": "$channel_messages",
                                "as": "msg",
                                "cond": {"$eq": ["$$msg.red_flag_found", True]}
                            }
                        }
                    },
                    "no_of_reports": {"$size": "$victim_reports"}
                }
            }
        ]
        # Execute the aggregation pipeline
        result = list(db.channels.aggregate(pipeline))
        
        # Convert ObjectId to string
        return convert_objectid(result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
