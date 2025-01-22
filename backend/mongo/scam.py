from mongo.config import db

collection =db["scam"]

def ins_upt_scam(details):
    red_flags = [item["red_flag"] for item in details["details"] if isinstance(item, dict) and "red_flag" in item]
    channel_id = details["channel_id"]
    username = details["username"]

    for scam_type in red_flags:
        # Check if the type exists in the collection
        existing_type = collection.find_one({"type": scam_type})

        if existing_type is None:
            collection.insert_one({
                "type": scam_type,
                "channels": [channel_id],  
                "users": [username]       
            })
        else:
            # If the type exists, update the existing document
            collection.update_one(
                {"type": scam_type}, 
                {
                    "$addToSet": {
                        "channels": channel_id,
                        "users": username
                    }
                }
            )