# Smart Vision Technology Quality Control

Welcome to the **Smart Vision Technology Quality Control** project! This repository contains a comprehensive solution for quality control in food products using advanced image processing and machine learning techniques. The project leverages various technologies and frameworks to provide a robust and user-friendly application.

## Table of Contents

- [Features](#features)
- [UI Design](#ui-design)
- [System Design](#system-design)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Acknowledgments](#acknowledgments)



## Demo Video

[![IMAGE ALT TEXT HERE](https://youtu.be/uqNquaDsiV4?si.jpg)](https://youtu.be/uqNquaDsiV4?si=XmiUVVtRb811LiQq)

## Features

- **Image Analysis**: Upload images for analysis to detect various attributes of food products.
- **OCR Capabilities**: Extract text from images using Optical Character Recognition (OCR).
- **Freshness Detection**: Assess the freshness of food items based on visual cues.
- **MRP and Expiry Detection**: Identify the Maximum Retail Price (MRP) and expiry dates from product packaging.
- **User-Friendly Interface**: Built with Next.js and Tailwind CSS for a responsive and modern UI.

## UI Design

The UI is designed to be intuitive and user-friendly, featuring:

- **Home Page**: A welcoming interface for users to upload images.
![image](https://github.com/user-attachments/assets/04ceada4-bbf2-4c0d-90e8-2ed328b8d72a)

- **Analysis Page**: Displays the results of the image analysis, including detected text, freshness status, and other relevant information.
![image](https://github.com/user-attachments/assets/76103863-a27b-4620-be9c-265de2f718b8)


## System Design

The system is designed to handle image uploads, process them through various machine learning models, and return analysis results. The architecture consists of:

- **Frontend**: Built with Next.js, it provides a user interface for uploading images and displaying results.
- **Backend**: A Flask/FastAPI server that handles image processing requests and communicates with machine learning models.
- **Machine Learning Models**: Various models for OCR, freshness detection, MRP and expiry detection, and item counting.

![image](https://github.com/user-attachments/assets/f257d828-796c-4ab7-8ef4-997cf8f0bc0b)

## Technologies Used

- **Frontend**: 
  - Next.js
  - React
  - Tailwind CSS
  - Framer Motion
- **Backend**: 
  - Flask
  - FastAPI
  - PyTorch
  - OpenCV
- **Machine Learning**: 
  - Hugging Face Transformers
  - YOLO (You Only Look Once) for object detection
- **Database**: 
  - SQLite (or any other database as per your implementation)
- **Deployment**: 
  - Vercel for frontend
  - Ngrok for local development

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- Python (v3.8 or later)
- pip (Python package manager)
- conda (for managing Python environments)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/Smart-Vision-Technology-Quality-Control-.git
   cd Smart-Vision-Technology-Quality-Control-
   ```

2. **Set up the frontend**:
   ```bash
   cd web-app
   npm install
   ```

3. **Set up the backend**:
   ```bash
   cd backend
   conda create -p venv python==3.8
   conda activate venv
   pip install -r requirements.txt
   ```

4. **Run the development server**:
   - For the frontend:
     ```bash
     npm run dev
     ```
   - For the backend:
     ```bash
     python app.py
     ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```bash
Smart-Vision-Technology-Quality-Control/
│
├── BrandDetail_Detection/     # Directory for brand detail detection
│   ├── OCR_MODEL.py           # OCR processing
│   └── ...                    # Other related files
│
├── Freshness_Detection/       # Directory for freshness detection
│   ├── app2.py                 # Backend application for freshness detection
│   ├── requirements.txt       # Python dependencies for freshness detection
│   └── ...                    # Other related files
│
└── Item_Count_Detection/      # Directory for MRP and expiry detection
|   ├── MRP_EXP_T2.ipynb       # Jupyter notebook for MRP and expiry detection
|   └── ...                    # Other related files
|
└── MRP_Expiry_Detection/      # Directory for Item Count detection
|   ├── YOLO.ipynb             # Jupyter notebook for Item Count detection
|   └── ...                    # Other related files
│
├── web-app/                   # Reusable React components
│   ├── components/            # Analysis results page component
│   │   ├── creative-home-page.tsx   # Home page component
│   │   ├── creative-analysis-page.tsx # Analysis results page component
│   │   ├── FeatureCard.tsx     # Component for displaying feature cards
│   │   ├── Header.tsx         # Header component for navigation
│   │   ├── Footer.tsx         # Footer component
│   │   └── ...                # Other UI components
│   │
│   ├── pages/                 # Next.js pages
│   │   ├── index.tsx          # Homepage
│   │   └── results.tsx        # Analysis results page
│   │
│   ├── public/                # Static assets (images, fonts, etc.)
│   └── styles/                # CSS styles
│
├── .env                       # environmet variables to setup LLM's
├── package.json               # Frontend dependencies and scripts
├── README.md                  # Main project README file

```


### Directory Descriptions
- **Brand_Detail_Detection/**: Jupyter notebooks for OCR and brand detail detection.
- **Freshness_Detection/**: Contains requirements and scripts for freshness detection.
- **Item_Count_Detection/**: Jupyter notebooks for item counting using YOLO.
- **Mrp_Expiry_Detection/**: Jupyter notebooks for detecting MRP and expiry dates.
- **web-app/**: Contains the frontend code built with Next.js, including components, pages, and styles.


## Usage

1. **Image Upload**: Users can upload images of food products for analysis.
2. **Analysis Results**: The application will display the results of the analysis, including detected text, freshness status, and MRP/expiry information.

## Acknowledgments
- Special thanks to the creators of the libraries and frameworks used in this project.

## Youtube Link
- https://youtu.be/uqNquaDsiV4?si=XmiUVVtRb811LiQq
  
