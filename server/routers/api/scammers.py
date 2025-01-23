from fastapi import APIRouter, HTTPException
from db.database import db
from bson import ObjectId

router = APIRouter()

def convert_objectid_to_str(doc):
    """Recursively convert ObjectId fields to strings."""
    if isinstance(doc, dict):
        return {key: convert_objectid_to_str(value) for key, value in doc.items()}
    elif isinstance(doc, list):
        return [convert_objectid_to_str(item) for item in doc]
    elif isinstance(doc, ObjectId):
        return str(doc)
    return doc

@router.get("/scammers")
async def get_items():
    pipeline = [
        # Step 1: Lookup channels and related scam data
        {
            "$lookup": {
                "from": "channels",
                "localField": "scam_channels",
                "foreignField": "channel_id",
                "as": "scam_channels_info"
            }
        },
        # Step 2: Calculate scam_count and top_scam
        {
            "$addFields": {
                "scam_count": {"$size": "$scam_channels"},
                "top_scam": {"$arrayElemAt": ["$scam_channels_info.channel_name", 0]}
            }
        },
        # Step 3: Project the necessary data for the API
        {
            "$project": {
                "username": 1,
                "scam_score": 1,
                "scam_count": 1,
                "top_scam": 1
            }
        }
    ]
    
    try:
        result = list(db.user.aggregate(pipeline))  # Querying the 'user' collection
        # Convert ObjectId to string
        return convert_objectid_to_str(result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
