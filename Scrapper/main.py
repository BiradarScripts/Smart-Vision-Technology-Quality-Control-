import os
import requests
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO
import google.generativeai as genai

# Set up Gemini API key
genai.configure(api_key="GEMINI_API_KEY")

# Function to scrape images of grocery items from an example e-commerce site
def scrape_images(url, save_dir):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, "html.parser")
    
    # Find image tags
    image_tags = soup.find_all("img")
    
    # Extract and save images
    os.makedirs(save_dir, exist_ok=True)
    image_paths = []
    for idx, img_tag in enumerate(image_tags):
        img_url = img_tag.get("src")
        if img_url and img_url.startswith("http"):
            img_data = requests.get(img_url).content
            img_name = f"item_{idx}.jpg"
            img_path = os.path.join(save_dir, img_name)
            with open(img_path, "wb") as f:
                f.write(img_data)
            image_paths.append(img_path)
            print(f"Saved: {img_path}")
    return image_paths

# Function to label images using Gemini
def label_images(image_paths):
    model = genai.GenerativeModel("gemini-pro-vision")
    labeled_images = {}
    for img_path in image_paths:
        try:
            # Open and send image to Gemini
            with open(img_path, "rb") as img_file:
                img = Image.open(img_file)
                img_bytes = BytesIO()
                img.save(img_bytes, format="JPEG")
                img_bytes.seek(0)
                
                # Generate label using Gemini
                response = model.generate_content(["Label this grocery item:", img_bytes.read()])
                label = response.text.strip()
                labeled_images[img_path] = label
                print(f"Labeled: {img_path} -> {label}")
                
                # Rename file with label
                new_path = os.path.join(os.path.dirname(img_path), f"{label.replace(' ', '_')}.jpg")
                os.rename(img_path, new_path)
        except Exception as e:
            print(f"Error labeling {img_path}: {e}")
    return labeled_images

# Main function
def main():
    # URL of the e-commerce page (replace with actual grocery website URL)
    ecommerce_url = "https://example.com/grocery"
    save_directory = "grocery_images"

    # Step 1: Scrape images
    print("Scraping images...")
    image_files = scrape_images(ecommerce_url, save_directory)
    
    # Step 2: Label images using Gemini
    print("Labeling images...")
    labeled_data = label_images(image_files)
    
    # Print final result
    print("Labeled Images:")
    for path, label in labeled_data.items():
        print(f"{path} -> {label}")

if _name_ == "_main_":
    main()