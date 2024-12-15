from mongoengine import Document, StringField, IntField, DateTimeField
from datetime import datetime

# Define a schema (model)
class User(Document):
    name = StringField(required=True)
    age = IntField()
    email = StringField(unique=True)
    created_at = DateTimeField(default=datetime.utcnow)

# Insert a new user into the 'chatapp' database
user = User(name="John Doe", age=30, email="johndoe@example.com")
user.save()

# Query the user from the 'chatapp' database
user = User.objects(email="johndoe@example.com").first()
print(user.name, user.age)
