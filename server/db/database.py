from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# Connect to MongoDB (local instance)
client = MongoClient(os.getenv('MONGO_URI'))

# Access a database
db = client['tnpolice']