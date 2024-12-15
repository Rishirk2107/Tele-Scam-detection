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
    # Define the prompt for scam detection with a scam score request
    prompt = f"""
    Please analyze the following message for signs of investment scams. Identify specific words or phrases that fall under the following red flags:

    1. **Promises of guaranteed returns**: Look for language like "guaranteed returns", "risk-free", or similar phrases suggesting no risk or certain profit.
    2. **Urgency tactics**: Identify phrases such as "limited time offer", "act fast", "hurry", or anything that creates pressure to invest quickly.
    3. **Suspicious links**: Highlight any links that may lead to untrusted websites or have a shady appearance (e.g., unusual domains, misspellings, or excessive tracking parameters).
    4. **Fake testimonials**: Find claims like "many people have already made huge profits", "everyone is investing", or other phrases implying unverified success stories.
    5. **Exaggerated language**: Identify words or phrases like "huge returns", "get rich quick", "life-changing opportunity", "too good to miss", etc.

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
        - "red_flag": The type of red flag detected
        - "phrase": The exact phrase found
        - "explanation": Why this phrase is a concern
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
