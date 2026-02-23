#!/bin/bash

# Create a virtual environment named 'venv'
echo "Creating virtual environment..."
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Upgrade pip and install requirements
echo "Installing requirements..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Setup complete. To activate the virtual environment, run: source venv/bin/activate"
