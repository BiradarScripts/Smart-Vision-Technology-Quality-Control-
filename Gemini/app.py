import os
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import google.generativeai as genai
from google.ai.generativelanguage import Content, Part, Blob
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langserve import add_routes

# Load environment variables
load_dotenv()

# Retrieve API key from environment variable
API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise Exception("API key not found. Please set the GOOGLE_API_KEY environment variable.")
else:
    genai.configure(api_key=API_KEY)  # Configure the API key

# Initialize the Google Gemini model
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)


# The template for generating the response
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

# Create a structured prompt using ChatPromptTemplate
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", generic_template),
        ("user", "{text}")
    ]
)

# Initialize the output parser
parser = StrOutputParser()

# Initialize the Langchain pipeline (chain)
chain = prompt | llm | parser

# Create FastAPI app
app = FastAPI(title="Langchain Server",
              version="1.0",
              description="A simple API server using Langchain runnable interfaces")

# Define your endpoint for image analysis
@app.post('/api/analyze-image')
async def analyze_image(file: UploadFile):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPEG or PNG images are allowed.")

    try:
        # Read the uploaded image data
        bytes_data = await file.read()

        # Prepare the content parts with the image data and instructions
        content_parts = [
            Part(text=generic_template),  # System message with instructions
            Part(inline_data=Blob(mime_type=file.content_type, data=bytes_data))  # The image as binary data
        ]

        # Generate the content (stream=True for real-time generation)
        response = genai.GenerativeModel('gemini-1.5-flash').generate_content(Content(parts=content_parts), stream=True)
        response.resolve()

        # Parse the AI's analysis result
        parsed_response = parser.invoke(response.text)

        # Return the AI's analysis result as JSON
        return JSONResponse(content={"analysis": parsed_response})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Add routes to the FastAPI app with the correct runnable
add_routes(app, chain, path="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
