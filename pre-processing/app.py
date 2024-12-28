import cv2
import os

# Input image path and output directory setup
script_dir = os.path.dirname(os.path.abspath(__file__))
input_image_path = os.path.join(script_dir, 'data', 'test.jpg')  # User-uploaded file
output_dir = os.path.join(script_dir, 'preprocessed_steps')

# Create directory to save preprocessed images if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Step 1: Read the input image
image = cv2.imread(input_image_path)
if image is None:
    raise FileNotFoundError(f"Unable to read image at {input_image_path}. Check the file path and integrity.")
cv2.imwrite(f"{output_dir}/step1_original.jpg", image)

# Remaining steps remain unchanged...


# Step 2: Resize the image for consistency (optional)
resized = cv2.resize(image, (1024, 768))  # Resize to fixed dimensions
cv2.imwrite(f"{output_dir}/step2_resized.jpg", resized)

# Step 3: Convert to grayscale
gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
cv2.imwrite(f"{output_dir}/step3_grayscale.jpg", gray)

# Step 4: Denoise the image using Gaussian blur
blurred = cv2.GaussianBlur(gray, (5, 5), 0)
cv2.imwrite(f"{output_dir}/step4_blurred.jpg", blurred)

# Step 5: Edge detection using Canny
edges = cv2.Canny(blurred, threshold1=50, threshold2=150)
cv2.imwrite(f"{output_dir}/step5_edges.jpg", edges)

# Step 6: Morphological operations to enhance boundaries
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
closed = cv2.morphologyEx(edges, cv2.MORPH_CLOSE, kernel, iterations=2)
dilated = cv2.dilate(closed, kernel, iterations=2)
cv2.imwrite(f"{output_dir}/step6_morphological.jpg", dilated)

# Step 7: Contour detection and bounding box drawing
contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
image_contours = resized.copy()
for contour in contours:
    x, y, w, h = cv2.boundingRect(contour)
    cv2.rectangle(image_contours, (x, y), (x + w, y + h), (0, 255, 0), 2)
cv2.imwrite(f"{output_dir}/step7_contours.jpg", image_contours)

print(f"Preprocessed steps saved in directory: {output_dir}")