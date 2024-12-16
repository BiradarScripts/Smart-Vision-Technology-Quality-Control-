from fastapi import FastAPI, UploadFile, File
import pytesseract
import cv2
import numpy as np
import re

app = FastAPI()

# Set the Tesseract OCR executable path (adjust based on your system)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Define regex patterns for expiry date and MRP
EXPIRY_DATE_PATTERN = r"(\d{2}[/-]\d{2}[/-]\d{4}|\d{2}[/-]\d{2})"  # Formats: DD-MM-YYYY, DD-MM, MM/YY
MRP_PATTERN = r"MRP[^\d]*(\d+\.\d{2})"  # Example: "MRP Rs. 123.45"

@app.post("/extract-details/")
async def extract_details(file: UploadFile = File(...)):
    # Read the uploaded image
    contents = await file.read()
    np_img = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    # Preprocess image for better OCR results
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    text = pytesseract.image_to_string(gray)

    # Extract expiry dates
    expiry_dates = re.findall(EXPIRY_DATE_PATTERN, text)

    # Extract MRP values
    mrp_values = re.findall(MRP_PATTERN, text)

    return {
        "extracted_text": text,  # Optional: To debug OCR output
        "expiry_dates": expiry_dates,
        "mrp_values": mrp_values
    }
