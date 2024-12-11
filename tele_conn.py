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

    # Generate spam report
    report = spam_report(message)

    # Prepare the spam report message
    response_message = (
        f"\ud83d\udd12 **Spam Report** \ud83d\udd12\n\n"
        f"**Message:** {message}\n"
        f"**Sender Name:** {sender_name}\n"
        f"**Sender Username:** @{sender_username}\n"
        f"**Sender ID:** {sender_id}\n"
        f"**Sender Type:** {sender_type}\n"
        f"**Channel:** {event.chat.title}\n\n"
        f"**Spam Analysis:** {report}"
    )

    # Send the report back to the channel
    await client.send_message(event.chat_id, response_message)

# Start the client asynchronously
print("Bot is running...")
client.start()

# Run the client until disconnected
client.run_until_disconnected()
