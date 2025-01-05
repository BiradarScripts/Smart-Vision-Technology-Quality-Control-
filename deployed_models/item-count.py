import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np

# Path to the item count model
item_count_model_path = "/content/drive/MyDrive/Item_Count.h5"

# Load the model
try:
    print(f"Attempting to load model from: {item_count_model_path}")
    item_count_model = load_model(item_count_model_path)
    print("Item count model loaded successfully.")
except Exception as e:
    print(f"Error loading the model: {e}")
    item_count_model = None

def predict_item_count_and_boxes(image_path):

    try:
      
        image = load_img(image_path, target_size=(128, 128))  # Adjust size to match model input
        image_array = img_to_array(image)
        image_array = np.expand_dims(image_array, axis=0)
        image_array = image_array / 255.0
        print(f"Image processed: {image.size} -> Array shape: {image_array.shape}")

        # Make predictions if the model is loaded
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
