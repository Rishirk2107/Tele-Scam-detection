from telethon import TelegramClient, events
from ai import spam_report
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Retrieve credentials from environment variables
api_id = int(os.getenv('API_ID'))  # Ensure the ID is an integer
api_hash = os.getenv('API_HASH')
bot_token = os.getenv('BOT_TOKEN')

# Channel list
channels = ['summa121']

# Create a TelegramClient instance for the bot
client = TelegramClient('bot_session', api_id, api_hash).start(bot_token=bot_token)


@client.on(events.NewMessage(chats=channels))  # This listens to messages from multiple channels
async def message_handler(event):
    # Get the message text
    message = event.message.message

    # Try to get the sender details
    sender = await event.get_sender()

    # Check if the sender is a User or Channel
    if hasattr(sender, 'first_name'):  # Sender is a User
        sender_name = f"{sender.first_name} {sender.last_name}" if sender.last_name else sender.first_name
        sender_username = sender.username if sender.username else "No username"
        sender_id = sender.id
        sender_type = "User"
    else:  # Sender is a Channel
        sender_name = sender.title  # Use channel title for the name
        sender_username = sender.username if sender.username else "No username"
        sender_id = sender.id
        sender_type = "Channel"

    # Print sender details
    print(f"Message: {message}")
    print(f"Sender Name: {sender_name}")
    print(f"Sender Username: @{sender_username}")
    print(f"Sender ID: {sender_id}")
    print(f"Sender Type: {sender_type}")
    print(f"Channel: {event.chat.title}")  # Show the channel name
    print("Spam reports")
    print(spam_report(message))

    # Add your custom logic here (e.g., logging, responding, etc.)

# Start the client asynchronously
print("Bot is running...")
client.start()

# Run the client until disconnected
client.run_until_disconnected()
