# Import libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.utils import to_categorical

# 1. Sample Dataset with 'Brand Name', 'Price', 'Category'
# Replace this with your actual dataset
data = {
    'brand_name': ['BrandA', 'BrandB', 'BrandC', 'BrandA', 'BrandB', 'BrandC', 'BrandA'],
    'price': [15.5, 25.0, 30.0, 20.0, 18.5, 40.0, 22.0],
    'feature1': [1.2, 3.4, 5.6, 7.8, 9.0, 2.1, 3.2],
    'feature2': [100, 200, 300, 400, 500, 150, 250],
    'category': ['food', 'ecommerce', 'food', 'food', 'ecommerce', 'ecommerce', 'food']
}
df = pd.DataFrame(data)

# 2. Preprocessing
X = df[['brand_name', 'price', 'feature1', 'feature2']]  # Features
y = df['category']  # Target

# Encode target labels (category) using LabelEncoder
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)  # Convert categories to integers
y_categorical = to_categorical(y_encoded)   # One-hot encoding for neural network

# Use ColumnTransformer to handle different feature types
preprocessor = ColumnTransformer(
    transformers=[
        ('brand_name', OneHotEncoder(), ['brand_name']),  # One-hot encode the brand_name
        ('scaler', StandardScaler(), ['price', 'feature1', 'feature2'])  # Scale numerical features
    ])

# 3. Build a pipeline to preprocess data and create the model
model_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', Sequential([
        Dense(128, activation='relu', input_dim=6),  # 6 because 3 columns after one-hot encoding (3 brands)
        Dropout(0.3),
        Dense(64, activation='relu'),
        Dense(y_categorical.shape[1], activation='softmax')  # Output layer
    ]))
])

# 4. Compile the Model
model_pipeline.named_steps['classifier'].compile(optimizer='adam',
                                                 loss='categorical_crossentropy',
                                                 metrics=['accuracy'])

# 5. Train the Model
X_processed = model_pipeline.named_steps['preprocessor'].fit_transform(X)  # Preprocess data
model_pipeline.named_steps['classifier'].fit(X_processed, y_categorical, epochs=20, batch_size=8)

# 6. Evaluate the Model
loss, accuracy = model_pipeline.named_steps['classifier'].evaluate(X_processed, y_categorical)
print(f"Test Accuracy: {accuracy:.2f}")

# 7. Predict (Example)
sample_input = pd.DataFrame([{'brand_name': 'BrandA', 'price': 20.0, 'feature1': 2.5, 'feature2': 150}])
sample_input_processed = model_pipeline.named_steps['preprocessor'].transform(sample_input)
prediction = model_pipeline.named_steps['classifier'].predict(sample_input_processed)
predicted_category = label_encoder.inverse_transform([np.argmax(prediction)])
print(f"Predicted Category: {predicted_category[0]}")
