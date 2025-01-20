from mongo.config import db

collection=db["channels"]

def ch_inp(details):
    red_flags = [item["red_flag"] for item in details["details"] if isinstance(item, dict) and "red_flag" in item]
    channel=collection.find_one({"channel_id":details["channel_id"]})
    if(not channel):
        ch_data={
            "channel_id":details["channel_id"],
            "channel_name":details["channel_name"],
            "flag":details["scam_score"]>70,
            "victim_reports":[],
            "username":[details["username"]],
            "scam_score":details["scam_score"],
            "red_flag":red_flags
        }
        collection.insert_one(ch_data)
    else:
        updated_score = (channel["scam_score"]+details["scam_score"]) / 2
        if(updated_score>5):
            collection.update_one(
                {"channel_id":details["channel_id"]},
                {
                    "$set":{
                        "flag":True,
                        "scam_score":updated_score,
                    },
                    "$addToSet":{
                        "username":details["username"],
                        "red_flag":{"$each":red_flags}
                    }
                }
            )
        else:
            collection.update_one(
                {"channel_id":details["channel_id"]},
                {
                    "$set":{
                        "flag":False,
                        "scam_score":updated_score,
                    },
                    "$addToSet":{
                        "username":details["username"],
                        "red_flag":{"$each":red_flags}
                    }
                }
            )