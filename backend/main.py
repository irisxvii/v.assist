from fastapi import FastAPI, File, UploadFile
import shutil
from ocr import extract_text

app = FastAPI()

@app.get("/")
def home():
    return {"status": "Backend Running"}

@app.post("/scan")
async def scan(file: UploadFile = File(...)):
    path = file.filename

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text(path)

    return {"raw_text": text}