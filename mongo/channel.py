from mongo.config import db

collection =db["scam"]

def insert_scam(details):
    data=collection.insert_one(details)
    print(data)