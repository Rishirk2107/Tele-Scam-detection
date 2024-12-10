import requests
import json
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Retrieve the API key from the environment variable
api_key = os.getenv("GEMINI_API_KEY")
print(api_key)

# Define the Gemini API endpoint
gemini_api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={api_key}"

def spam_report(message):
    # Define the prompt for scam detection
    prompt = f"""
    Please analyze the following message for signs of investment scams. Look for the following red flags:
    1. **Promises of guaranteed returns** or any language suggesting risk-free investments.
    2. **Urgency tactics**, such as "limited time offer" or "act fast" or phrases that push people to invest quickly without due diligence.
    3. **Suspicious links**: Any links that may lead to untrusted websites or have a shady appearance.
    4. **Fake testimonials**: Claims like "many people have already made huge profits" or "everyone is investing".
    5. **Exaggerated language**: Words like "huge returns", "get rich quick", "too good to miss", etc.

    Please analyze the message and report if any of the above red flags are found. If a scam is detected, return "Yes" and explain which red flags were found. If the message is not a scam, return "No" with a brief explanation. Return the results as a structured JSON format.

    Message: {message}
    """

    # Create the request payload
    payload = {
        "contents": [
            {
                "parts": [{"text": prompt}]
            }
        ]
    }

    # Set up the headers for the API request
    headers = {
        "Content-Type": "application/json"
    }

    # Send the request to the Gemini API
    response = requests.post(gemini_api_url, headers=headers, json=payload)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the response JSON
        response_json = response.json()

        # Extract the response text, which contains the JSON string
        response_text = response_json['candidates'][0]['content']['parts'][0]['text']
        response_text=response_text[7:-4]

        # Try to parse the response text as JSON
        try:
            structured_response = json.loads(response_text)
            return structured_response
        except json.JSONDecodeError:
            print("The response text is not in valid JSON format.")
            return None
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None
