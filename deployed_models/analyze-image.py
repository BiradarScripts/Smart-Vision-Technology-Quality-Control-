import fastapi
from fastapi import File, UploadFile
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os
from io import BytesIO
from tensorflow.keras import Model
from tensorflow.keras.layers import Input, Dense

app = fastapi.FastAPI()


model_path = "/content/drive/MyDrive/freshness_detection_model.h5"  

try:
    brand_model = load_model(model_path) 
except Exception as e:
    brand_model=None


print(f"freshness detection model loaded successfully from {model_path}")

def predict_item_count_and_boxes(image_path):

    try:
       
        image = load_img(image_path, target_size=(128, 128))  
        image_array = img_to_array(image)
        image_array = np.expand_dims(image_array, axis=0)
        image_array = image_array / 255.0
        print(f"Image processed: {image.size} -> Array shape: {image_array.shape}")


        if item_count_model is not None:
            predictions = item_count_model.predict(image_array)
            print(f"Predictions: {predictions}")

           
            predicted_count = int(predictions[0])  
            predicted_boxes = predictions[1]  
            boxes_list = []
            for i in range(predicted_count):
                box = predicted_boxes[i]  
                
               
                x1, y1, x2, y2 = box
                points = [
                    [x1, y1],  # Top-left corner
                    [x2, y1],  # Top-right corner
                    [x2, y2],  # Bottom-right corner
                    [x1, y2]   # Bottom-left corner
                ]
                
                boxes_list.append({
                    "itemIndex": i + 1, 
                    "box": points  
                })

            return {
                "itemCount": predicted_count,
                "boxes": boxes_list
            }

        else:
            print("Model is not loaded. Cannot make predictions.")
            return {"error": "Model not loaded"}

    except Exception as e:
        print(f"Error processing image: {e}")
        return {"error": str(e)}
    


def item_count_and_boxes(image_array):
    print(f"Simulating item count prediction for the image with shape: {image_array.shape}")

    
    item_count = predict_item_count_and_boxes(image_array)
    print(f"Simulated item count prediction: {item_count} items detected.")

    box = [
        [x1, y1], [x2, y2], [x3, y3], [x4, y4]  
    ]
    print(f"Generated bounding box for item {i + 1}: {box}")
    boxes.append({"box": box})

    return {"itemCount": item_count, "boxes": boxes}



def call_brand_name_api(cropped_image):
    print(f"Simulating an API call to the brand-name API with image shape: {cropped_image.shape}")

   
    print("Sending image to brand-name API...")


    brand_name = f"Brand_{random.randint(1, 5)}"
    confidence = random.uniform(0.5, 1.0)  
    print(f"API response: Predicted brand: {brand_name} with confidence: {confidence:.2f}")

    return brand_name, confidence



labels = ["Freshness Index", "isPackaged", "Firmness", "VisualColor", "texture"]


@app.post("/api/analyze-image")
async def predict(file: UploadFile = File(...)):
    print("Received file for prediction.")
    try:
        # Read image file
        image_data = await file.read()
        image = load_img(BytesIO(image_data), target_size=(128, 128))  
        image_array = img_to_array(image)  
        image_array = np.expand_dims(image_array, axis=0) 
        image_array = image_array / 255.0  
        print(f"Image processed: {image.size} -> Array shape: {image_array.shape}")

        
        print("Calling item-count function to predict number of items and bounding boxes...")
        item_count_result = simulate_item_count_and_boxes(image_array)

       
        item_count = item_count_result.get("itemCount", 0)
        bounding_boxes = item_count_result.get("boxes", [])

        print(f"Item count model returned {item_count} items detected.")
        print(f"Detected bounding boxes: {bounding_boxes}")
        
        
        for i in range(item_count):
            print(f"Processing item {i + 1} with bounding box: {bounding_boxes[i]['box']}")

          
            box = bounding_boxes[i]['box']
            x1, y1 = box[0]
            x2, y2 = box[1]
            x3, y3 = box[2]
            x4, y4 = box[3]
            print(f"Item {i + 1} bounding box coordinates: ({x1}, {y1}), ({x2}, {y2}), ({x3}, {y3}), ({x4}, {y4})")

         
     
            print(f"Simulated image crop for item {i + 1} with shape: {cropped_image.shape}")

            print(f"Sending cropped image of item {i + 1} to brand-name API...")
            predictions = model.predict(image_array)
            print(f"Predictions: {predictions}")

            result = {}
            for i, label in enumerate(labels):
                result[label] = predictions[0][i]
                print(f"{label}: {predictions[0][i]}")

            return result
    except Exception as e:
        print(f"Error processing file: {e}")
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
