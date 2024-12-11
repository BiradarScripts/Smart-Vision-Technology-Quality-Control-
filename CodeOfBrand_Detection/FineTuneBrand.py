import torch
from transformers import AutoProcessor, AutoModelForVisionTextDualEncoder, Trainer, TrainingArguments
from datasets import load_dataset
from torchvision.transforms import Compose, Resize, ToTensor, Normalize
from PIL import Image

# Load the dataset
def preprocess_function(example):
    # Load and preprocess image
    image = Image.open(example['/brandname/brand']).convert("RGB")
    transform = Compose([
        Resize((224, 224)),  # Resize image to match model input size
        ToTensor(),
        Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5]),
    ])
    example['pixel_values'] = transform(image)
    example['text'] = example['text_label']
    return example

# Replace 'path_to_your_dataset' with your dataset path
dataset = load_dataset("json", data_files="/brandname/BrandName.json")
dataset = dataset.map(preprocess_function)

# Split dataset into train and validation
train_test_split = dataset['train'].train_test_split(test_size=0.1)
train_dataset = train_test_split['train']
val_dataset = train_test_split['test']

# Load pre-trained LLaMA 3.2 Vision model
model_name = "your-llama-3.2-vision-checkpoint"
processor = AutoProcessor.from_pretrained(model_name)
model = AutoModelForVisionTextDualEncoder.from_pretrained(model_name)

# Define training arguments
training_args = TrainingArguments(
    output_dir="./results",
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    num_train_epochs=3,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    logging_dir="./logs",
    logging_steps=10,
    save_total_limit=2,
    fp16=True,  # Enable mixed precision training
    push_to_hub=False,
    learning_rate=2e-5,
    report_to=["tensorboard"],
)

# Custom collate function for multimodal inputs
def collate_fn(batch):
    pixel_values = torch.stack([item['pixel_values'] for item in batch])
    input_texts = [item['text'] for item in batch]
    inputs = processor(images=pixel_values, text=input_texts, return_tensors="pt", padding=True)
    return inputs

# Define Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset,
    data_collator=collate_fn,
    tokenizer=processor,
)

# Fine-tune the model
trainer.train()

# Save the fine-tuned model
model.save_pretrained("./fine_tuned_llama_vision")
processor.save_pretrained("./fine_tuned_llama_vision")
