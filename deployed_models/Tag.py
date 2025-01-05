import fastapi
from fastapi import File, UploadFile
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
from io import BytesIO

app = fastapi.FastAPI()

expiry_model_path = "/content/drive/MyDrive/mrp_exp_detection_model.h5"

try:
    print(f"Attempting to load model from: {expiry_model_path}")
    expiry_model = load_model(expiry_model_path)
    print("Expiry model loaded successfully.")
except Exception as e:

    expiry_model = None
    
print("Expiry model loaded successfully from {expiry_model_path}.")
    


output_labels = ["mrp", "expiry", "net.wt"]

@app.post("/api/Tag")
async def predict_expiry(file: UploadFile = File(...)):
    print("Received file for expiry and weight prediction.")
    try:

        image_data = await file.read()
        print(f"File size received: {len(image_data)} bytes.")
        image = load_img(BytesIO(image_data), target_size=(128, 128))
        image_array = img_to_array(image)
        image_array = np.expand_dims(image_array, axis=0)
        image_array = image_array / 255.0
        print(f"Image processed: {image.size} -> Array shape: {image_array.shape}")

      
        if expiry_model is not None:
            predictions = expiry_model.predict(image_array)
            print(f"Predictions: {predictions}")

            result = {
                "mrp": float(predictions[0][0]),
                "expiry": float(predictions[0][1]),
                "net.wt": float(predictions[0][2])
            }
            print(f"MRP: {result['mrp']}, Expiry: {result['expiry']}, Net Weight: {result['net.wt']}")
        else:
            result = {"error": "Model is not loaded. Cannot make predictions."}
            print("Model is not loaded. Skipping prediction.")

        return result
    except Exception as e:
        print(f"Error processing file: {e}")
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    print("Starting the server...")
    uvicorn.run(app, host="0.0.0.0", port=8003)
