import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OCR_API_KEY")

def extract_text(image_path):
    url = "https://api.ocr.space/parse/image"

    with open(image_path, 'rb') as f:
        response = requests.post(
            url,
            files={'file': f},
            data={'apikey': API_KEY, 'language': 'eng'}
        )

    result = response.json()
    return result['ParsedResults'][0]['ParsedText']