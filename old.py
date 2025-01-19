from telethon import TelegramClient
from ai import spam_report
from dotenv import load_dotenv
import os

from mongo.messages import insert_scam
from mongo.user import ins_upt_user

# Load environment variables from .env file
load_dotenv()

# Retrieve credentials from environment variables
api_id = int(os.getenv('API_ID'))  # Ensure the ID is an integer
api_hash = os.getenv('API_HASH')
phone_number = os.getenv('PHONE_NUMBER')  # Add your phone number here

# Channel list
channels = [
    'the_trading_advisor_stock', 
    'tradelikebarlin', 'nifty_50_stockspro', 'Intraday_Banknifty_Calls',
    'Account_handel', 'mehtaisbackofficial_0', 'UshasAnalysis0',
    'account_handling_stock', 'stockpro_online'
]

# Create a TelegramClient instance for the user account (not a bot)
client = TelegramClient('user_session', api_id, api_hash)

async def fetch_recent_messages(channel_username, limit=100):
    """Fetch recent messages from a specific channel."""
    print(f"Fetching the last {limit} messages from {channel_username}...")
    try:
        async for message in client.iter_messages(channel_username, limit=limit):
            # Process each message
            message_text = message.message
            sender = await message.get_sender()

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
            report = spam_report(message_text)

            # Prepare the report
            report['message'] = message_text
            report["channel_id"] = channel_username
            report["username"] = sender_username

            # Insert into MongoDB
            insert_scam(report)
            ins_upt_user(report)

            print(f"Processed message: {message_text[:50]}...")  # Log the message being processed

    except Exception as e:
        print(f"Error fetching messages from {channel_username}: {e}")

async def main():
    # Start the client and login if needed
    await client.start(phone_number)
    print("Logged in successfully!")

    # Fetch recent messages from each channel
    for channel in channels:
        await fetch_recent_messages(channel, limit=100)

    print("Finished fetching recent messages.")

    # Keep the client running
    await client.run_until_disconnected()

print("User is running...")
client.loop.run_until_complete(main())
