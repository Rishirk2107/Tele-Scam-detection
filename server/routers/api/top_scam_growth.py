from fastapi import APIRouter, HTTPException
from db.database import db

router = APIRouter()

@router.get("/top_scam_growth")
async def get_items1():
    pipeline = [
    # Step 1: Unwind the 'details' array to get individual red_flag values
        {
            "$unwind": "$details"
        },
        # Step 2: Project the necessary fields: red_flag (scam_type), and timestamp
        {
            "$project": {
                "scam_type": "$details.red_flag",  # We assume red_flag corresponds to scam_type
                "timestamp": 1  # Include the timestamp field for conversion
            }
        },
        # Step 3: Attempt to convert 'timestamp' string to a valid Date
        {
            "$addFields": {
                "timestamp": {
                    "$cond": {
                        "if": { "$eq": [{ "$type": "$timestamp" }, "string"] },  # Check if timestamp is a string
                        "then": { 
                            "$dateFromString": { 
                                "dateString": "$timestamp", 
                                "format": "%Y-%m-%d %H:%M:%S"  # Specify the exact format for the string
                            }
                        },  # Convert timestamp to Date
                        "else": "$timestamp"  # Keep the existing value if it's already a Date
                    }
                }
            }
        },
        # Step 4: Check if the 'timestamp' is a valid Date type after conversion
        {
            "$addFields": {
                "isValidDate": { "$eq": [{ "$type": "$timestamp" }, "date"] }  # Ensure it's a Date after conversion
            }
        },
        # Step 5: Filter out invalid timestamp documents
        {
            "$match": {
                "isValidDate": True  # Only include documents with a valid Date timestamp
            }
        },
        # Step 6: Format the timestamp to a date string if it's valid
        {
            "$project": {
                "scam_type": 1,
                "date": { "$dateToString": { "format": "%Y-%m-%d", "date": "$timestamp" } }
            }
        },
        # Step 7: Group by scam_type and date to get the count
        {
            "$group": {
                "_id": { "scam_type": "$scam_type", "date": "$date" },
                "count": { "$sum": 1 }
            }
        },
        # Step 8: Sort by date (optional)
        {
            "$sort": { "_id.date": 1 }
        },
        # Step 9: Project the final format
        {
            "$project": {
                "scam_type": "$_id.scam_type",
                "date": "$_id.date",
                "count": 1,
                "_id": 0
            }
        }
    ]

    return list(db.messages.aggregate(pipeline))