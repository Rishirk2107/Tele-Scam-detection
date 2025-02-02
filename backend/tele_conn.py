from telethon import TelegramClient, events
from ai import spam_report
from dotenv import load_dotenv
import os

from mongo.messages import insert_scam
from mongo.user import ins_upt_user
from mongo.channels import ch_inp
from mongo.scam import ins_upt_scam

# Load environment variables from .env file
load_dotenv()

# Retrieve credentials from environment variables
api_id = int(os.getenv('API_ID'))  # Ensure the ID is an integer
api_hash = os.getenv('API_HASH')
phone_number = os.getenv('PHONE_NUMBER')  # Add your phone number here

# Create a TelegramClient instance for the user account (not a bot)
client = TelegramClient('user_session', api_id, api_hash)

async def get_user_channels():
    """Fetch all channels the user is a member of and return a list of their usernames."""
    dialogs = await client.get_dialogs()
    channels = [dialog.entity for dialog in dialogs if dialog.is_channel]
    
    # Extract channel usernames
    channel_usernames = [channel.username for channel in channels if channel.username]
    
    return channel_usernames

@client.on(events.NewMessage())  # Listens to all new messages
async def message_handler(event):
    # Get the message text
    message = event.message.message

    # Try to get the sender details
    sender = await event.get_sender()
    channel_id = event.chat.username
    message_timestamp = event.message.date  # This is a datetime object
    formatted_timestamp = message_timestamp.strftime('%Y-%m-%d %H:%M:%S')

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
        f" **Spam Report** \n\n"
        f"**Message:** {message}\n"
        f"**Sender Name:** {sender_name}\n"
        f"**Sender Username:** @{sender_username}\n"
        f"**Sender ID:** {sender_id}\n"
        f"**Sender Type:** {sender_type}\n"
        f"**Channel:** {event.chat.title}\n\n"
        f"**Spam Analysis:** {report}\n"
        f"**Channel ID:** {channel_id}"
    )

    # Store data in MongoDB
    report['timestamp'] = formatted_timestamp
    report['message'] = message
    report["channel_id"] = channel_id
    report["username"] = sender_username
    report["channel_name"] = event.chat.title

    insert_scam(report)
    ins_upt_user(report)
    ch_inp(report)
    ins_upt_scam(report)

async def main():
    """Start the Telegram client and fetch channels dynamically."""
    await client.start(phone_number)  # Will prompt for code the first time
    print("Logged in successfully!")

    # Fetch user's joined channels dynamically
    channels = await get_user_channels()
    
    print(f"Monitoring {len(channels)} channels: {channels}")

    # Add event listener for only these channels
    client.add_event_handler(message_handler, events.NewMessage(chats=channels))

    await client.run_until_disconnected()

print("User is running...")
client.loop.run_until_complete(main())
