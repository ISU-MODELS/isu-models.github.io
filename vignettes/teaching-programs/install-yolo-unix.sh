#!/bin/bash
echo "==================================================="
echo "YOLOv8 Installation Script for UNIX (macOS/Linux)"
echo "==================================================="
echo ""

if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python 3 could not be found. Please install Python 3."
    exit 1
fi

echo "Creating virtual environment 'yolov8-env'..."
python3 -m venv yolov8-env

echo "Activating virtual environment..."
source yolov8-env/bin/activate

echo "Upgrading pip..."
pip install --upgrade pip

echo "Installing Ultralytics (YOLOv8)..."
pip install ultralytics

echo ""
echo "Note: Ensure you have a CUDA-compatible PyTorch installed for training!"
echo "See https://pytorch.org/get-started/locally/ for your specific CUDA version command."
echo ""
echo "==================================================="
echo "YOLOv8 installation complete!"
echo "==================================================="
echo "To activate the virtual environment later, run:"
echo "source yolov8-env/bin/activate"
