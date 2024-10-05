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
generic_template = '''You are a knowledgeable AI assistant. Analyze the uploaded image for its content and quality:
1. **Detect the main objects or subjects in the image**.
2. **Check the overall quality of the image**, including clarity, brightness, and color balance.
3. Provide a **brief description** based on your analysis of the image.'''

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
            model = genai.GenerativeModel('gemini-1.5-pro')

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
