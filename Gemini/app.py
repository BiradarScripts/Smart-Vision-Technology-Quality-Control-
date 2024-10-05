import os
from dotenv import load_dotenv
import streamlit as st
import google.generativeai as genai
from PIL import Image
from google.ai.generativelanguage import Content, Part, Blob  # Adjusted import statement

# Load environment variables
load_dotenv()

# Retrieve API key from environment variable
API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    st.error("API key not found. Please set the GOOGLE_API_KEY environment variable.")
else:
    genai.configure(api_key=API_KEY)

st.set_page_config(page_title="Gemini Pro Vision Image Analysis Project", page_icon="📸", layout="centered", initial_sidebar_state='collapsed')

st.header("Google AI Studio + Gemini Pro")

uploaded_file = st.file_uploader("Choose an Image file", accept_multiple_files=False, type=['jpg', 'png'])

if uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption='Uploaded Image', use_column_width=True)

    bytes_data = uploaded_file.getvalue()
    
    generate = st.button("Generate!")

    if generate:
        model = genai.GenerativeModel('gemini-1.5-pro')

        # Create the content parts for the request
        content_parts = [
            Part(text="Please analyze the following image."),
            Part(inline_data=Blob(mime_type='image/jpeg', data=bytes_data))
        ]

        # Generate the content
        response = model.generate_content(Content(parts=content_parts), stream=True)
        response.resolve()

        # Display the analysis result
        st.write(response.text)
