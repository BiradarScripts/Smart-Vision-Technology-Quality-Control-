# DRISHTI: Advanced Quality Control Using Smart Vision Technology

Welcome to **DRISHTI**, the next-generation solution for quality control in food products, leveraging cutting-edge image processing and machine learning technologies. This upgraded version builds upon the foundational Smart Vision Technology to provide a more advanced, efficient, and user-friendly experience.
---

## Demo Video
- Watch DHRISHTI in action: "Coming Soon"
---

## Features

### New Enhancements in DHRISHTI
- **Advanced Image Analysis**: Enhanced algorithms for detecting food product attributes.
- **Text Recognition (OCR)**: Extracts text with improved accuracy and multilingual support.
- **Freshness & Quality Assessment**: Incorporates machine learning for better freshness detection.
- **MRP & Expiry Detection**: Advanced recognition for retail price and expiry dates.
- **Modernized UI/UX**: Improved design using Next.js, Tailwind CSS, and animations.

### Web App of DRISHTI

- **Home Page**: Simplistic upload and navigation interface.
![image](https://github.com/user-attachments/assets/f12e5f7a-b377-4354-a74f-d1886a67d7e4)

- **Image Upload Page**: Simplistic upload interface.
![image](https://github.com/user-attachments/assets/e0b4e353-5020-4f47-a040-94db5fe7e3f1)

- **Analysis Results**: Displays analysis outcomes in a basic layout.
![image](https://github.com/user-attachments/assets/d0c86315-108d-416e-a745-c35dfb456334)

- **AI Chat **: Your personal AI nutritionist.
![image](https://github.com/user-attachments/assets/f96e606e-7623-46f9-a8ba-7274576312b3)

- **Dashboard  **: Track what you eat.
![image](https://github.com/user-attachments/assets/93a0a128-d4ed-4f99-83f9-321bd72e9791)



---

## System Design

DRISHTI's architecture is built for efficiency and scalability:

- **Frontend**: Redesigned using Next.js and Tailwind CSS for an engaging user experience.
- **Backend**: Powered by Flask/FastAPI, seamlessly integrated with machine learning models.
- **Machine Learning Models**: Updated YOLO for object detection, Hugging Face Transformers for OCR, and specialized models for freshness and MRP detection.

![image](https://github.com/user-attachments/assets/299312c9-38ee-4349-a957-f492b1841f99)
---

## Smart-Vision Technology (Older Version)

## Demo Video
- Watch Smart-Vision in action: [https://youtu.be/uqNquaDsiV4?si=XmiUVVtRb811LiQq](https://youtu.be/uqNquaDsiV4?si=XmiUVVtRb811LiQq)
---

### Key Features
- **Image-Based Analysis**: Basic algorithms for detecting food product attributes.
- **OCR Capability**: Text recognition with limited accuracy.
- **Freshness & Quality Indicators**: Simple detection methods for food freshness.
- **User Interface**: Functional design with basic navigation.

### Screenshots of Smart Vision

- **Home Page**: Simplistic upload and navigation interface.
![image](https://github.com/user-attachments/assets/04ceada4-bbf2-4c0d-90e8-2ed328b8d72a)

- **Analysis Results**: Displays analysis outcomes in a basic layout.
![image](https://github.com/user-attachments/assets/76103863-a27b-4620-be9c-265de2f718b8)

---
## System Design

Smart-Vision's architecture is built for efficiency and scalability:

- **Frontend**: Redesigned using Next.js and Tailwind CSS for an engaging user experience.
- **Backend**: Powered by Flask/FastAPI, seamlessly integrated with machine learning models.
- **Machine Learning Models**: Updated YOLO for object detection, Hugging Face Transformers for OCR, and specialized models for freshness and MRP detection.

![System Design](https://github.com/user-attachments/assets/f257d828-796c-4ab7-8ef4-997cf8f0bc0b)

---

## Technologies Used

### Frontend
- Next.js
- React
- Tailwind CSS
- Framer Motion

### Backend
- Flask / FastAPI
- PyTorch
- OpenCV

### Machine Learning
- Hugging Face Transformers
- YOLO (You Only Look Once)

### Database
- SQLite or any preferred database

### Deployment
- Vercel (Frontend)
- Ngrok (Local Development)

---

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- Python (v3.8 or later)
- pip
- conda (for Python environment management)

### Installation

#### Setting up Smart Vision

1. **Clone the Smart Vision repository**:
   ```bash
   git clone https://github.com/yourusername/Smart-Vision.git
   cd Smart-Vision/web-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm start
   ```

4. **Access Smart Vision**: Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

#### Setting up DRISHTI

1. **Clone the DHRISHTI repository**:
   ```bash
   git clone https://github.com/yourusername/Smart-Vision.git
   cd  web-app-v2/client
   ```
      
2. **Set up the frontend**:
   ```bash
   npm install
   ```

3. **Set up the backend**:
   ```bash
   cd ../../backend
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

5. **Access DHRISHTI**: Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## Project Structure

### Smart Vision
```bash
Smart-Vision/
│
├── web-app/                # Frontend for Smart Vision
│   ├── public/             # Static assets
│   ├── src/                # React components and pages
│   └── ...
├── backend/               # Backend scripts (if applicable)
└── ...
│
├── BrandDetail_Detection/      # OCR and brand detail detection
│   ├── OCR_MODEL.py           # OCR processing script
│   └── ...                    # Other files
│
├── Freshness_Detection/       # Scripts for freshness detection
│   ├── app2.py                # Backend application
│   └── requirements.txt       # Dependencies
│
├── Item_Count_Detection/      # MRP and expiry detection
│   ├── MRP_EXP_T2.ipynb       # Jupyter notebook
│   └── ...
│
├── web-app-v2/                 # New client-side application# DHRISHTI frontend
│   ├── client/                # DHRISHTI frontend
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Next.js pages
│   │   ├── public/            # Static assets
│   │   ├── styles/            # CSS styles
│   │   └── ...
│   └── ...
├── .env                       # Environment variables for APIs/LLMs
├── package.json               # Frontend dependencies and scripts
├── README.md                  # Main project README file
└── ...
```

---

## Usage

1. **Image Upload**: Users can upload images of food products.
2. **Real-Time Analysis**: Results displayed instantly with details such as freshness, MRP, and expiry.

---

## Acknowledgments
- Special thanks to the contributors and developers of the frameworks and libraries used.

---

Enjoy exploring DHRISHTI and Smart Vision, where advanced technology meets precision quality control!
