import requests
import json
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Retrieve the API key from the environment variable
groq_api_key = os.getenv("GROQ_API_KEY")

# Define the Groq API endpoint
groq_api_url = "https://api.groq.com/openai/v1/chat/completions"

def spam_report(message):
    print(message)
    # Define the prompt for scam detection with a scam score request
    prompt = f"""
        Please analyze the following message for signs of scams, specifically targeting the following categories:
        
        **Cryptocurrency scams**:
        - **Initial Coin Offerings (ICO)**: Look for promises of revolutionary technology, high returns, or vague descriptions of utility.
        - **Phishing**: Identify fake links or emails claiming to be from wallets or exchanges asking for personal information.
        - **Ponzi schemes**: Highlight claims like "earn by recruiting others" or offers of consistent, unrealistic returns.

        **Stock market manipulation**:
        - **Pump and dump schemes**: Look for language like "buy now before it skyrockets" or specific stock tickers promoted aggressively.
        - **Insider trading pitches**: Spot claims such as "exclusive stock tips" or "insider knowledge".

        **Forex scams**:
        - **Unregulated brokers**: Identify promises of easy trading, huge leverage, or guarantees of high profits.
        - **Fake platforms**: Spot offers of "automated trading" with unverifiable results or phrases like "start with just $100 and double your money in a day."

        For each identified red flag, please provide:
        - A clear indication of whether a red flag was found ("true" or "false").
        - A list of specific red flags detected along with the exact words or phrases triggering them.
        - A brief explanation of why each identified phrase is considered a red flag.

        Additionally, please calculate a **scam score out of 100** based on the number and severity of identified red flags:
        - Assign points for each type of red flag found (e.g., minor flags could add fewer points, while major flags could add more).
        - Provide a brief rationale for the assigned score.

        If no red flags are found, return "false" with a brief explanation of why the message does not contain any concerning elements.

        Return the results in a structured JSON format with the following keys:
        - "red_flag_found": Boolean
        - "details": List of objects containing:
            - "red_flag": The type of red flag detected (Initial Coin Offerings (ICO) / Phishing / Ponzi schemes / Pump and dump schemes / Insider trading pitches / Unregulated brokers / Fake platforms)
            - "phrase": The exact phrase found
            - "explanation": Why this phrase is a concern
        - "links" : if links which present in the message else empty array []
        - "scam_score": Integer (0-100)
        - "score_explanation": String explaining how the score was derived.

        Message: {message}
    """

    # Create the request payload
    payload = {
        "messages": [{"role": "user", "content": prompt}],
        "model": "llama-3.3-70b-versatile"
    }

    # Set up the headers for the API request
    headers = {
        "Authorization": f"Bearer {groq_api_key}",
        "Content-Type": "application/json"
    }

    # Send the request to the Groq API
    response = requests.post(groq_api_url, headers=headers, json=payload)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the response JSON
        response_json = response.json()

        # Extract the response content
        response_text = response_json['choices'][0]['message']['content']

        # Remove markdown code block formatting
        if response_text.startswith("```json") and response_text.endswith("```"):
            response_text = response_text[7:-3].strip()  # Strip out "```json" at the start and "```" at the end
        
        elif response_text.startswith("```") and response_text.endswith("```"):
            response_text = response_text[4:-3].strip()
            
        print(response_text)
        # Try to parse the response text as JSON
        try:
            structured_response = json.loads(response_text)
            return structured_response
        except json.JSONDecodeError:
            print("The response text is not in valid JSON format.")
            print("Response Text:")
            print(response_text)  # Print the response for debugging
            return None
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None
