import os
from dotenv import load_dotenv
import streamlit as st
import google.generativeai as genai
from PIL import Image
from google.ai.generativelanguage import Content, Part, Blob
from langchain_core.messages import HumanMessage, SystemMessage

# Load environment variables
load_dotenv()

# Retrieve API key from environment variable
API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    st.error("API key not found. Please set the GOOGLE_API_KEY environment variable.")
else:
    genai.configure(api_key=API_KEY)

# Set up Streamlit UI
st.set_page_config(page_title="Gemini Pro Vision Image Analysis Project", page_icon="📸", layout="centered", initial_sidebar_state='collapsed')
st.header("Google AI Studio + Gemini Pro")

# File uploader
uploaded_file = st.file_uploader("Choose an Image file", accept_multiple_files=False, type=['jpg', 'png'])

# Define the generic template
generic_template = '''You are a knowledgeable AI assistant. Analyze the uploaded image of one or more eatable items or products for their freshness and provide a customer-friendly report using the following format:

### Product Freshness Report:

For each item detected in the image, provide the following details:

1. **Item Name**: [Name of the eatable item]
   - **Freshness Index: [FI]** (Out of 10)
   - **Status: [Fresh/Moderately Fresh/Overripe/Stale/etc.]** 
   - **Color**: [Brief description of the item’s color and how it indicates its freshness].
   - **Texture**: [Brief description of the surface condition and texture].
   - **Firmness**: [Brief description of how firm or soft the item likely is, if applicable].
   - **Packaging/Condition**: [Description of packaging condition or surface elements, if applicable].
   - **Recommendation**: [Provide a practical recommendation based on the freshness, like "ready to eat," "consume soon," "best for baking," or "not suitable for consumption"].

If there are multiple eatables in the image, list each item separately using the above format.
'''



if uploaded_file is not None:
    # Display the uploaded image
    image = Image.open(uploaded_file)
    st.image(image, caption='Uploaded Image', use_column_width=True)

    # Read image data
    bytes_data = uploaded_file.getvalue()

    # Button to trigger the generation
    generate = st.button("Generate!")

    if generate:
        try:
            # Initialize the model for content generation
            model = genai.GenerativeModel('gemini-1.5-flash')

            # Prepare the content parts with the image data and instructions
            content_parts = [
                Part(text=generic_template),  # System message with instructions
                Part(inline_data=Blob(mime_type='image/jpeg', data=bytes_data))  # The image as binary data
            ]

            # Generate the content (stream=True for real-time generation)
            response = model.generate_content(Content(parts=content_parts), stream=True)
            response.resolve()

            # Display the AI's analysis result
            st.write(f"AI's Analysis: {response.text}")

        except Exception as e:
            st.error(f"An error occurred: {e}")


# Here’s the formula for calculating the Freshness Index (FI) based on various key factors that apply to any eatable item or product. The factors are scored on a scale of 0 to 10, and the overall FI is a weighted sum of these scores:

# Freshness Index (FI) Formula:
# 𝐹
# 𝐼
# =
# 𝑤
# 1
# ⋅
# Color Score
# +
# 𝑤
# 2
# ⋅
# Texture Score
# +
# 𝑤
# 3
# ⋅
# Firmness Score
# +
# 𝑤
# 4
# ⋅
# Packaging/Condition Score
# FI=w 
# 1
# ​
#  ⋅Color Score+w 
# 2
# ​
#  ⋅Texture Score+w 
# 3
# ​
#  ⋅Firmness Score+w 
# 4
# ​
#  ⋅Packaging/Condition Score
# Where:

# 𝐹
# 𝐼
# FI is the Freshness Index (on a scale of 0 to 10).
# 𝑤
# 1
# ,
# 𝑤
# 2
# ,
# 𝑤
# 3
# ,
# 𝑤
# 4
# w 
# 1
# ​
#  ,w 
# 2
# ​
#  ,w 
# 3
# ​
#  ,w 
# 4
# ​
#   are the weights assigned to each factor, summing to 1 (weights can be adjusted based on importance).
# Each factor (Color, Texture, Firmness, Packaging/Condition) is rated on a scale of 0 to 10, where 10 represents ideal freshness or condition.
# Suggested Weights:
# For a balanced assessment across various eatable items:

# Color: 
# 𝑤
# 1
# =
# 0.30
# w 
# 1
# ​
#  =0.30 (Color often gives a strong visual indication of freshness or spoilage).
# Texture: 
# 𝑤
# 2
# =
# 0.25
# w 
# 2
# ​
#  =0.25 (Texture can indicate staleness or damage).
# Firmness: 
# 𝑤
# 3
# =
# 0.25
# w 
# 3
# ​
#  =0.25 (Firmness is crucial, especially for fruits, bread, and other perishables).
# Packaging/Condition: 
# 𝑤
# 4
# =
# 0.20
# w 
# 4
# ​
#  =0.20 (The condition of the packaging or surface of the product may indicate how well-preserved it is).