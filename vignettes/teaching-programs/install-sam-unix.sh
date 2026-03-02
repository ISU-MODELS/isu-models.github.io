#!/bin/bash
echo "==================================================="
echo "SAM2 Installation Script for UNIX (macOS/Linux)"
echo "==================================================="
echo ""

if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python 3 could not be found. Please install Python 3."
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "[ERROR] Git could not be found. Please install Git."
    exit 1
fi

echo "Creating virtual environment 'sam2-env'..."
python3 -m venv sam2-env

echo "Activating virtual environment..."
source sam2-env/bin/activate

echo "Upgrading pip..."
pip install --upgrade pip

echo "Cloning SAM2 repository..."
if [ ! -d "sam2" ]; then
    git clone https://github.com/facebookresearch/sam2.git
else
    echo "SAM2 repository already cloned."
fi

cd sam2

echo "Installing SAM2..."
pip install -e ".[notebooks]"

cd ..
echo ""
echo "==================================================="
echo "SAM2 installation complete!"
echo "==================================================="
echo "To activate the virtual environment later, run:"
echo "source sam2-env/bin/activate"
