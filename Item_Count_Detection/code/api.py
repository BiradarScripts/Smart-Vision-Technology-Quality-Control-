from fastapi import FastAPI, UploadFile, File
from ultralytics import YOLO
import cv2
import numpy as np

app = FastAPI()

# Load trained YOLO model
model = YOLO('runs/train/exp/weights/best.pt')

@app.post("/item-counting/")
async def count_items(file: UploadFile = File(...)):
    contents = await file.read()
    np_img = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    # Run inference
    results = model(img)
    count = len(results[0].boxes)  # Count bounding boxes

    return {"item_count": count}
