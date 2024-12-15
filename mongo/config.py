from mongoengine import connect
from dotenv import load_dotenv

load_dotenv()

# Use the MongoDB Atlas connection string
print(os.getenv('MONGO_URI'))

# Connect to MongoDB
connect(host=os.getenv('MONGO_URI'), db=scams)
