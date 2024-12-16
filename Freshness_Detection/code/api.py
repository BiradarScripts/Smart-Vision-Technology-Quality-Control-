from fastapi import FastAPI, UploadFile, File
import tensorflow as tf
import cv2
import numpy as np

app = FastAPI()

# Load trained CNN model
model = tf.keras.models.load_model('freshness_model.h5')
classes = ['Fresh', 'Moderate', 'Spoiled']

@app.post("/freshness-detection/")
async def detect_freshness(file: UploadFile = File(...)):
    contents = await file.read()
    np_img = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    # Preprocess image
    img_resized = cv2.resize(img, (128, 128)) / 255.0
    img_input = np.expand_dims(img_resized, axis=0)

    # Prediction
    predictions = model.predict(img_input)
    predicted_class = classes[np.argmax(predictions)]

    return {"freshness_status": predicted_class}
