from mongo.config import db

collection =db["user"]

def ins_upt_user(details):
    red_flags = [item["red_flag"] for item in details["details"] if isinstance(item, dict) and "red_flag" in item]
    user=collection.find_one({"username":details["username"]})
    if(not user):
        user_data = {
            "username": details["username"],
            "scam_channels": [details["channel_id"]],  # Add the current channel ID
            "flag": details["scam_score"] > 70,  # True if scam_score > 70
            "scam_score": details["scam_score"],  # Initial score
            "victim_reports":[],
            "red_flag":red_flags
        }
        collection.insert_one(user_data)

    else:
        updated_score = (user["scam_score"] + details["scam_score"]) / 2 
        if(details["scam_score"]>70):
            collection.update_one(
                {"username":details["username"]},
                {
                    "$set":{
                        "flag":True,
                        "scam_score":updated_score,
                    },
                    "$addToSet":{
                        "scam_channels":details["channel_id"],
                        "red_flag":{"$each":red_flags}
                    }
                }
            )
        else:
            collection.update_one(
                {"username": details["username"]},
                {
                    "$set": {
                        "scam_score": updated_score,
                    },
                    "$addToSet":{
                        "scam_channels":details["channel_id"],
                        "red_flag":{"$each":red_flags}
                    }
                },
            )
