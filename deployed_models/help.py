import os
import xml.etree.ElementTree as ET
import torch
from PIL import Image
import pytesseract
import cv2
from torchvision import transforms
from torchvision.models.detection import fasterrcnn_resnet50_fpn

# Initialize the object detection model
model = fasterrcnn_resnet50_fpn(pretrained=True)
model.eval()

# Define image transformations
transform = transforms.Compose([
    transforms.ToTensor(),
])

# Directory containing images
image_dir = 'MyDrive/drive/ScrapedImages'
output_dir = 'MyDrive/drive/Annotations'
os.makedirs(output_dir, exist_ok=True)

# List of known brand names
brand_names = ['BrandA', 'BrandB', 'BrandC']  # Replace with actual brand names

# Function to create Pascal VOC XML
def create_pascal_voc_xml(image_filename, image_size, objects):
    annotation = ET.Element('annotation')
    ET.SubElement(annotation, 'filename').text = image_filename
    size = ET.SubElement(annotation, 'size')
    ET.SubElement(size, 'width').text = str(image_size[0])
    ET.SubElement(size, 'height').text = str(image_size[1])
    ET.SubElement(size, 'depth').text = str(image_size[2])

    for obj in objects:
        object_elem = ET.SubElement(annotation, 'object')
        ET.SubElement(object_elem, 'name').text = obj['name']
        bndbox = ET.SubElement(object_elem, 'bndbox')
        ET.SubElement(bndbox, 'xmin').text = str(obj['bbox'][0])
        ET.SubElement(bndbox, 'ymin').text = str(obj['bbox'][1])
        ET.SubElement(bndbox, 'xmax').text = str(obj['bbox'][2])
        ET.SubElement(bndbox, 'ymax').text = str(obj['bbox'][3])

    tree = ET.ElementTree(annotation)
    xml_filename = os.path.join(output_dir, os.path.splitext(image_filename)[0] + '.xml')
    tree.write(xml_filename)

# Iterate through images in the directory
for image_filename in os.listdir(image_dir):
    if image_filename.endswith(('.jpg', '.png', '.jpeg')):
        image_path = os.path.join(image_dir, image_filename)
        image = Image.open(image_path).convert("RGB")
        image_tensor = transform(image).unsqueeze(0)

        # Perform object detection
        with torch.no_grad():
            predictions = model(image_tensor)

        # Filter predictions with a confidence threshold
        confidence_threshold = 0.5
        boxes = predictions[0]['boxes']
        scores = predictions[0]['scores']
        labels = predictions[0]['labels']

        detected_objects = []

        for box, score, label in zip(boxes, scores, labels):
            if score >= confidence_threshold:
                # Extract bounding box coordinates
                xmin, ymin, xmax, ymax = box.int().tolist()

                # Crop the detected region
                cropped_image = image.crop((xmin, ymin, xmax, ymax))

                # Perform OCR to extract text
                ocr_text = pytesseract.image_to_string(cropped_image)

                # Check if the extracted text matches any known brand names
                detected_brand = None
                for brand in brand_names:
                    if brand.lower() in ocr_text.lower():
                        detected_brand = brand
                        break

                # Save the detected object if a brand is detected
                if detected_brand:
                    detected_objects.append({
                        'name': detected_brand,
                        'bbox': (xmin, ymin, xmax, ymax)
                    })

        # Create Pascal VOC XML for the image
        if detected_objects:
            image_size = image.size + (3,)  # (width, height, depth)
            create_pascal_voc_xml(image_filename, image_size, detected_objects)
            