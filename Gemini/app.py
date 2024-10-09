import os
from dotenv import load_dotenv
import streamlit as st
import google.generativeai as genai
from PIL import Image
from google.ai.generativelanguage import Content, Part, Blob
from langchain_core.output_parsers import StrOutputParser  # Import the output parser

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
   - **Direction**: [Indicate the position/direction of the item in the image, e.g., "top-left," "center," "bottom-right," etc.]
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

            # Initialize the output parser
            parser = StrOutputParser()

            # Parse the AI's analysis result
            parsed_response = parser.invoke(response.text)

            # Display the AI's analysis result
            st.write(f"AI's Analysis: {parsed_response}")

        except Exception as e:
            st.error(f"An error occurred: {e}")

# Here’s the formula for calculating the Freshness Index (FI) based on various key factors that apply to any eatable item or product. The factors are scored on a scale of 0 to 10, and the overall FI is a weighted sum of these scores:

# Freshness Index (FI) Formula:
# FI = w1 * Color Score + w2 * Texture Score + w3 * Firmness Score + w4 * Packaging/Condition Score
# Where:
# FI is the Freshness Index (on a scale of 0 to 10).
# w1, w2, w3, w4 are the weights assigned to each factor, summing to 1 (weights can be adjusted based on importance).
# Each factor (Color, Texture, Firmness, Packaging/Condition) is rated on a scale of 0 to 10, where 10 represents ideal freshness or condition.
# Suggested Weights:
# Color: w1 = 0.30
# Texture: w2 = 0.25
# Firmness: w3 = 0.25
# Packaging/Condition: w4 = 0.20
