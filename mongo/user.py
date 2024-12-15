from mongo.config import db

collection =db["user"]

def ins_upt_user(details):
    data=collection.insert_one(details)
    print(data)