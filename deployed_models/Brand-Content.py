import fastapi
from fastapi import File, UploadFile
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
check=True
from io import BytesIO
import os
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict

app = fastapi.FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# model_path = "/content/drive/MyDrive/nutrient_ingredient_detection.h5"
if not check: 
    model_path = os.path.join(os.getcwd(), 'nutri_and_ing_model.h5')

try:
    print(f"Attempting to load model from: {model_path}")
    model = load_model(model_path)
except Exception as e:

    model = None
    
print("Brand-Content model loaded successfully from  {model_path}")

@app.post("/api/Brand-Content")
async def handle_brand_content(data: Dict[str, str]):
    # Access the 'key' value from the received data
    return {"message": "Brand-name received successfully", "received_key": data.get('key')}

async def predict_nutrients_and_ingredients(file: UploadFile = File(...)):
    print("Received file for nutrient and ingredient prediction.")
    try:
        image_data = await file.read()
        print(f"File size received: {len(image_data)} bytes.")
        image = load_img(BytesIO(image_data), target_size=(128, 128))
        image_array = img_to_array(image)
        image_array = np.expand_dims(image_array, axis=0)
        image_array = image_array / 255.0
        print(f"Image processed: {image.size} -> Array shape: {image_array.shape}")

        if model is not None:
            predictions = model.predict(image_array)
            print(f"Predictions: {predictions}")

            
            predicted_nutrient = np.argmax(predictions[0])  
            predicted_ingredient = np.argmax(predictions[1])  

            result = {
                "predictedNutrient": str(predicted_nutrient),
                "predictedIngredient": str(predicted_ingredient)
            }

            print(f"Predicted Nutrient: {result['predictedNutrient']}")
            print(f"Predicted Ingredient: {result['predictedIngredient']}")

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
    uvicorn.run(app, host="0.0.0.0", port=8004)
