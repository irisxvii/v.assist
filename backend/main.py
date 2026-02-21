from fastapi import UploadFile, File
from fastapi.responses import FileResponse
from fpdf import FPDF
import shutil
import os
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
@app.post("/convert-image-to-pdf")
async def convert_image(file: UploadFile = File(...)):

    # Step 1: Save uploaded image temporarily
    image_path = f"temp_{file.filename}"

    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Step 2: Create PDF
    pdf = FPDF()
    pdf.add_page()

    # Step 3: Add image to PDF
    pdf.image(image_path, x=10, y=10, w=180)

    # Step 4: Save PDF file
    pdf_path = "converted_output.pdf"
    pdf.output(pdf_path)

    # Optional: remove temporary image
    os.remove(image_path)

    # Step 5: Return PDF file
    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="converted.pdf"
    )