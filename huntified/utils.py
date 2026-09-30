import time
import requests
from google.genai import types
from google import genai
from decouple import config

def analyze_property_image(image_url):
    api_key = config("GEMINI_API_KEY")
    # Initialize the client (it automatically reads GEMINI_API_KEY from your .env)
    client = genai.Client(api_key=api_key)
 
    
    prompt = (
    "Analyze this image, which was submitted as a real estate property listing photo. "
    "First, check whether the image actually shows a house, apartment, room, or other "
    "physical property (interior or exterior). If it does not show a property at all "
    "(e.g. it's a person, an unrelated object, a screenshot, or anything not depicting "
    "a physical space), treat this as FRAUD. "
    "If it does show a property, check for digital alterations, watermarks from other "
    "real estate sites, or signs that it is a generic stock photo. "
    "Return your answer strictly in this format: "
    "VERDICT: [SAFE or FRAUD] | REASON: [Brief explanation]"
)
    model= [
        'gemini-3.8-flash', 
        'gemini-2.5-flash', 
        'gemini-2.5-pro',
        ]
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        image_bytes = response.content
        mime_type = response.headers.get('content-type', 'image/jpeg')
    except Exception as e:
        return False, f"Failed to download image: {str(e)}"
        # Send the image URL and prompt to Gemini using a multimodal model
    last_error = None
    for moodel_name in model:
        try:
            response = client.models.generate_content(
                model=moodel_name,
                contents=[prompt,types.Part.from_bytes(data=image_bytes, mime_type=mime_type)]
            )
            result_text = response.text
        
        # Simple parsing logic for your Django view
            if "VERDICT: FRAUD" in result_text.upper():
                return False, result_text
            
            return True, result_text

        except Exception as e:
            last_error = e
            if '503' in str(e) or "UNAVAILABLE" in str(e):  
                time.sleep(2)
                continue
            continue      # Fallback if the network or API fails during the hackathon demo
    return True, f"All models busy, bypassed: {str(last_error)}"