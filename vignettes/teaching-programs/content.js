// Wrapper for local file access (bypassing CORS)
window.vignetteContent = `---

# Session 5: Teaching Programs

**© 2026 Ryan P. McGehee, Ph.D.**

---

## Introduction

In previous sessions, you learned how to execute, design, organize, and optimize your code. However, modern programs built with Machine Learning (ML) workflows, particularly in Computer Vision, rarely involve writing logic rules from scratch. Instead, we "teach" powerful models to recognize patterns.

When working with state-of-the-art models like **YOLOv8** (You Only Look Once) for bounding box detection and **SAM2** (Segment Anything Model 2) for pixel-level object segmentation, we rarely train from zero. We use **Transfer Learning** to take a model pre-trained on millions of generic images and **fine-tuning** to customize it for our specific data.

In this session, we will explore the principles and practices of teaching these models. You will learn how to curate specialized datasets, configure architectures, run training loops, grade performance, and deploy the final "student" into production. 

---

## I. Installation

Before training models, we must create our environment, install dependencies, and plan our project structure. Training often benefits from GPU acceleration; attempting to train modern vision models on a CPU can take impractically long times.

To simplify the setup process, we have provided automated installer scripts that will create a dedicated virtual environment, install the required dependencies, and clone any necessary repositories for your specific operating system.

### YOLOv8

YOLOv8 (You Only Look Once) is a state-of-the-art object detection model that can be trained on custom datasets. The link to the [Ultralytics](https://ultralytics.com/) website provides a wealth of resources for learning more about YOLOv8.

We will use the [Ultralytics](https://ultralytics.com/) API to train YOLOv8 on our custom dataset. The API provides a simple interface for training YOLOv8 on custom datasets, and it handles the training loop, loss calculation, and model saving automatically.

Use the following commands to install YOLOv8. The automated installers will attempt to create a virtual environment and install the required dependencies. If the automated installers do not work for you, you can follow the manual instructions below.

**Automated Installers:**
- [Download Windows Installer: install-yolo-windows.bat](./install-yolo-windows.bat)
- [Download UNIX Installer: install-yolo-unix.sh](./install-yolo-unix.sh)

**Manual Instructions (Windows & UNIX):**
\`\`\`bash
# Create and activate a virtual environment
python3 -m venv yolov8-env
# On Windows: yolov8-env\\Scripts\\activate
# On UNIX: source yolov8-env/bin/activate

# Install YOLOv8 (Will install PyTorch automatically)
pip install ultralytics

# Note: Ensure you have a CUDA-compatible PyTorch installed for training!
# See https://pytorch.org/get-started/locally/ for your specific CUDA version command.
\`\`\`

### SAM2

SAM2 (Segment Anything Model 2) is a state-of-the-art pixel-level object segmentation model that can be trained on custom datasets. The link to the [Facebook Research](https://github.com/facebookresearch/sam2) website provides a wealth of resources for learning more about SAM2.

We will use the [Facebook Research](https://github.com/facebookresearch/sam2) API to train SAM2 on our custom dataset. The API provides a simple interface for training SAM2 on custom datasets, and it handles the training loop, loss calculation, and model saving automatically.

Use the following commands to install SAM2. The automated installers will attempt to create a virtual environment and install the required dependencies. If the automated installers do not work for you, you can follow the manual instructions below.

**Automated Installers:**
- [Download Windows Installer: install-sam-windows.bat](./install-sam-windows.bat) (Sets \`SAM2_BUILD_CUDA=0\` for inference)
- [Download UNIX Installer: install-sam-unix.sh](./install-sam-unix.sh)

**UNIX (Linux with PyTorch >= 2.5.1 and CUDA >= 12.1):**
\`\`\`bash
git clone https://github.com/facebookresearch/sam2.git
cd sam2
pip install -e ".[notebooks]"
\`\`\`

**Windows:**
Use the **Windows Subsystem for Linux (WSL)** with Ubuntu, and run the UNIX installer or follow the UNIX instructions above to enable full training capabilities. Running the native Windows installer skips the CUDA build (\`SAM2_BUILD_CUDA=0\`), which is only recommended for inference, not training.

---

## II. Curating Data

Data curation is the foundation of any successful machine learning project. The quality, diversity, and labeling accuracy of your dataset directly dictate what your model can learn. A poorly curated dataset will inevitably lead to a poorly performing model, regardless of how advanced the underlying algorithm is.

### Principle: The Pipeline

Start with "Garbage In, Garbage Out" (GIGO). Models are only as good as the data they learn from.
- **Cleaning:** Handling missing labels and out-of-focus images.
- **Formatting:** Structuring images and labels into strict directories that the model framework expects.
- **Splitting:** Dividing data into Train, Validation, and Test sets to prevent overfitting (memorization).

### Practice: YOLOv8

To practice, we have generated a synthetic agricultural dataset containing 100 images of crops and weeds. Please download and extract the dataset into your working directory:
- [Download Crop & Weed Dataset: crop-weed-dataset.zip](./crop-weed-dataset.zip)

Unlike traditional architectures where you write custom Dataloaders, YOLOv8 enforces a strict directory structure and uses a \`data.yaml\` configuration file. The extracted dataset already follows this strict structure:

**1. Directory Structure:**
\`\`\`text
crop-weed-dataset/
├── train/
│   ├── images/
│   │   ├── 0000.jpg
│   │   └── 0001.jpg
│   └── labels/
│       ├── 0000.txt
│       └── 0001.txt
└── val/
    ├── images/
    └── labels/
\`\`\`
Each \`0000.txt\` file contains bounding box coordinates relative to the image size (normalized 0 to 1), class ID first: \`class_id center_x center_y width height\`.

**2. The \`data.yaml\` File:**
\`\`\`yaml
# Specify dataset locations
path: ../crop-weed-dataset
train: train/images
val: val/images

# Specify classes
nc: 2
names: ['crop', 'weed']
\`\`\`

### Practice: SAM2

To practice with segmentation masks, we have generated a corresponding SAM2 dataset containing the same 100 agricultural images but with pixel-level masks instead of bounding boxes. Please download and extract the dataset into your working directory:
- [Download Crop & Weed SAM2 Dataset: crop-weed-sam2-dataset.zip](./crop-weed-sam2-dataset.zip)

Unlike YOLO's bounding box text files, SAM2 requires a directory of corresponding binary image masks where pixel values indicate the class presence.

**Directory Structure:**
\`\`\`text
crop-weed-sam2-dataset/
├── train/
│   ├── images/
│   │   ├── 0000.jpg
│   │   └── 0001.jpg
│   └── masks/
│       ├── 0000.png
│       └── 0001.png
└── val/
    ├── images/
    └── masks/
\`\`\`
Each \`0000.png\` mask perfectly aligns with its corresponding \`0000.jpg\` image, where the background pixels are \`0\`, crop pixels are \`1\`, and weed pixels are \`2\`.

---

## III. Architecting Students (under construction)

Modern computer vision workflows rely on transfer learning. Instead of designing deep neural networks layer by layer, we start with a pre-trained 'foundation' model that already understands basic visual features like edges, shapes, and textures, and adapt it to our specific task.

### Principle: Layers & Pre-training

We do not "program" a neural network; we "architect" it. However, building primitive layers (\`nn.Linear\`) is a thing of the past for vision tasks. We start with powerful, pre-trained "backbones".

### Practice: Loading YOLOv8 Architectures

The Ultralytics API simplifies architecture loading into a single line.

The following code will create a new YOLOv8 model from scratch (initializing random weights) and a pre-trained model (transfer learning). Pre-trained models are recommended for most use cases as they provide a good balance of speed and accuracy. There are multiple YOLOv8 models available, each with different trade-offs between speed (inference time) and accuracy (output quality). The 'n' in 'yolov8n' stands for nano, which is the smallest model size. You could also use 's' (small), 'm' (medium), 'l' (large), or 'x' (extra-large) depending on your speed vs. accuracy trade-offs.

\`\`\`python
from ultralytics import YOLO

# 1. Build a NEW model from scratch (Initializes random weights)
scratch_model = YOLO('yolov8n.yaml') 

# 2. Load a PRE-TRAINED model (Transfer Learning - Recommended)
pretrained_model = YOLO('yolov8n.pt') 

# The 'n' stands for nano. You could also use 's' (small), 'm' (medium), 'l' (large), or 'x' (extra-large) depending on your speed vs. accuracy trade-offs.
\`\`\`

### Practice: Loading SAM2 Architectures

Similarly, the SAM2 library provides a clean interface for loading models, seamlessly integrating with the Hugging Face hub for automatic checkpoint downloads. SAM2 also comes in various sizes: 'tiny', 'small', 'base-plus', and 'large', balancing evaluation speed and segmentation accuracy similarly to YOLOv8.

\`\`\`python
from sam2.build_sam import build_sam2, build_sam2_hf

# 1. Build a NEW model from scratch (Initializes random weights)
# Requires specifying the Hydra config file packaged with SAM2
scratch_model = build_sam2("sam2_hiera_t.yaml")

# 2. Load a PRE-TRAINED model (Transfer Learning - Recommended)
# Automatically downloads the tiny ('t') checkpoint from Hugging Face
pretrained_model = build_sam2_hf("facebook/sam2-hiera-tiny")

# SAM2 comes in various sizes: 'tiny', 'small', 'base-plus', and 'large', balancing evaluation speed and segmentation accuracy.
\`\`\`

### Note on Model Scale

As the model size increases (e.g., from 'nano' to 'extra-large'), two things happen:
1. **Higher Accuracy**: Larger models have more parameters, allowing them to learn more complex patterns and generally provide better results.
2. **Resource Cost**: Larger models take up significantly more **disk space** (e.g., 6MB for YOLOv8n vs 130MB for YOLOv8x), take longer to **download**, and require more **RAM/VRAM** to load. Furthermore, they perform more calculations per image, making them slower during both training and inference. 

Always start with the smallest model ('nano' or 'tiny') to verify your pipeline works before scaling up to larger architectures.

---

## IV. Training Models (under construction)

Training is the computational process where the model adjusts its internal parameters (weights) to minimize the difference between its predictions and the actual truth (your labels). This requires feeding batches of data through the model repeatedly over multiple epochs.

### Principle: The Learning Loop

Training is an iterative process. Historically, we wrote manual loops defining the Forward Pass, calculating Loss, executing the Backward Pass (gradients), and running the Optimizer Step. Modern APIs abstract these complex loops away.

### Practice: The Ultralytics Training API

Training YOLOv8 on your custom dataset requires only calling \`.train()\` and passing your \`yaml\` configuration. It handles batching, loss calculation, gradients, and saving checkpoints automatically.

\`\`\`python
from ultralytics import YOLO

# Load pre-trained model
model = YOLO('yolov8n.pt')

# Train the model
# device='cuda' forces GPU usage, ensuring it doesn't take days to train
results = model.train(
    data='crop-weed-dataset/data.yaml', 
    epochs=100,      # Number of times the model sees the entire dataset
    imgsz=640,       # Resize all images to 640x640 during training
    batch=16,        # Number of images sent to GPU at once (lower if you get Memory errors)
    device='cuda',
    project='Crop_Weed_Training',
    name='Run_1'
)
\`\`\`
The framework automatically saves the best performing weights to \`Crop_Weed_Training/Run_1/weights/best.pt\`.

---

## V. Grading Performance (under construction)

Once a model is trained, we must objectively evaluate its performance to ensure it hasn't simply memorized the training data. We use a separate set of unseen images—the validation set—to test how well the model generalizes to new scenarios.

### Principle: Validation & Metrics

How do we know if the student is actually learning or just memorizing the textbook? We test it on the **Validation Set**—data the model sees but never trains on.

- **YOLOv8 Metric:** mAP (mean Average Precision). Measures how tightly the predicted boxes match the true boxes, averaged across all classes.
- **SAM2 Metric:** IoU (Intersection over Union). Measures the pixel-level overlap between the predicted mask and the true mask.

### Practice: Validating YOLOv8

YOLOv8 automatically validates during training, but you can explicitly run validation against the \`val\` dataset defined in your \`yaml\` file.

\`\`\`python
from ultralytics import YOLO

# Load the custom model we just trained
model = YOLO('Crop_Weed_Training/Run_1/weights/best.pt')

# Evaluate model performance on the validation set
metrics = model.val()

print(f"Mean Average Precision (mAP50-95): {metrics.box.map}")
print(f"mAP for Class 0 ({metrics.names[0]}): {metrics.box.maps[0]}")
\`\`\`

---

## VI. Deploying Inference (under construction)

Deployment is the final stage where your trained model is moved out of the training environment and into a production system. In production, the model runs 'inference' to make predictions on new, live data as quickly and efficiently as possible.

### Principle: Serving Predictions

A trained model is useless stuck in a training script. It must be deployed to "serve" predictions to users, edge devices, or web servers with minimal latency (fast predictions) and high throughput.

### Practice: Exporting Models

Often, PyTorch (\`.pt\`) models are too heavy or lack optimizations for production environments. We export the "student" model into a universal, highly optimized format like **ONNX** (Open Neural Network Exchange).

\`\`\`python
from ultralytics import YOLO

# Load our trained model
model = YOLO('Crop_Weed_Training/Run_1/weights/best.pt')

# Export to ONNX format. This creates a highly optimized file
# that can be loaded in C++, JavaScript (via ONNXRuntime Web),
# or run natively on Edge devices (like Raspberry Pi) without PyTorch overhead.
success = model.export(format='onnx', dynamic=True)

if success:
    print("Model successfully exported to ONNX format!")
\`\`\`

---

## Conclusion

Teaching modern Machine Learning models has transitioned from grueling boilerplate math into elegant pipeline management. By mastering data curation through strict directory formatting, leveraging transfer learning with pre-trained backbones, and utilizing powerful abstractions like the Ultralytics API, you can drastically reduce development time. The key to success is no longer building the best architecture from scratch, but rather providing the highest quality data to open-source and/or proprietary state-of-the-art models like YOLO and SAM2.

While this example uses YOLOv8 and SAM2, the same principles apply to other ML models, software frameworks, and practical applications. The key is to understand the pipeline and how to use powerful abstractions to reduce development time.

---
`
