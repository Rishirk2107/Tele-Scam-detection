from telethon import TelegramClient, events
from ai import spam_report
from dotenv import load_dotenv
import os

from mongo.channel import insert_scam
from mongo.user import ins_upt_user

# Load environment variables from .env file
load_dotenv()

# Retrieve credentials from environment variables
api_id = int(os.getenv('API_ID'))  # Ensure the ID is an integer
api_hash = os.getenv('API_HASH')
phone_number = os.getenv('PHONE_NUMBER')  # Add your phone number here

# Channel list
channels = ['summa121','hahahascambot','the_trading_advisor_stock','tradelikebarlin','nifty_50_stockspro','Intraday_Banknifty_Calls','Account_handel','mehtaisbackofficial_0','UshasAnalysis0','account_handling_stock','stockpro_online']

# Create a TelegramClient instance for the user account (not a bot)
client = TelegramClient('user_session', api_id, api_hash)

@client.on(events.NewMessage(chats=channels))  # This listens to messages from multiple channels
async def message_handler(event):
    # Get the message text
    message = event.message.message

    # Try to get the sender details
    sender = await event.get_sender()
    
    channel_id= event.chat.username

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
    # print(report)
    # print(report["red_flag_found"])

    # Prepare the spam report message
    response_message = (
        f" **Spam Report** \n\n"
        f"**Message:** {message}\n"
        f"**Sender Name:** {sender_name}\n"
        f"**Sender Username:** @{sender_username}\n"
        f"**Sender ID:** {sender_id}\n"
        f"**Sender Type:** {sender_type}\n"
        f"**Channel:** {event.chat.title}\n\n"
        f"**Spam Analysis:** {report}"
        f"**Channel id:** {channel_id}"
        
    )
    report['message']=message
    report["channel_id"]=channel_id
    report["username"]=sender_username
    
    insert_scam(report)
    ins_upt_user(report)

    # # Send the report back to the channel
    # await client.send_message(event.chat_id, response_message)

# Start the client asynchronously (login with phone number the first time)
print("User is running...")

async def main():
    await client.start(phone_number)  # Will prompt for code the first time
    print("Logged in successfully!")
    await client.run_until_disconnected()

client.loop.run_until_complete(main())
