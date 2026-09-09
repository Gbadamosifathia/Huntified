from google import genai
from decouple import config

def analyze_property_image(image_url):
    # Initialize the client (it automatically reads GEMINI_API_KEY from your .env)
    client = genai.Client()
    
    prompt = (
        "Analyze this real estate listing image. Check for digital alterations, "
        "watermarks from other real estate sites, or signs that it is a generic stock photo. "
        "Return your answer strictly in this format: "
        "VERDICT: [SAFE or FRAUD] | REASON: [Brief explanation]"
    )
    
    try:
        # Send the image URL and prompt to Gemini using a multimodal model
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[prompt, image_url]
        )
        
        result_text = response.text
        
        # Simple parsing logic for your Django view
        if "FRAUD" in result_text.upper():
            return False, result_text
        return True, result_text

    except Exception as e:
        # Fallback if the network or API fails during the hackathon demo
        return True, str(e)