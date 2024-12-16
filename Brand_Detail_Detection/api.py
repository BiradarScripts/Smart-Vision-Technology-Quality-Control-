from fastapi import FastAPI, UploadFile, File
from ultralytics import YOLO
import cv2
import numpy as np

app = FastAPI()

# Load trained YOLOv5 model
model = YOLO('runs/train/exp/weights/best.pt')  # Path to trained weights

@app.post("/brand-detection/")
async def detect_brands(file: UploadFile = File(...)):
    contents = await file.read()
    np_img = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    # Run YOLO inference
    results = model(img)
    annotated_img = results[0].plot()

    # Save annotated image
    cv2.imwrite("output.jpg", annotated_img)
    return {"message": "Brand detection complete", "output_image": "output.jpg"}
