@echo off
echo ===================================================
echo YOLOv8 Installation Script for Windows
echo ===================================================
echo.

echo Checking for Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in your PATH. 
    echo Please install Python 3.10 or newer.
    pause
    exit /b
)

echo Creating virtual environment "yolov8-env"...
python -m venv yolov8-env
if %errorlevel% neq 0 (
    echo [ERROR] Failed to create virtual environment.
    pause
    exit /b
)

echo Activating virtual environment...
call yolov8-env\Scripts\activate.bat

echo Upgrading pip...
python -m pip install --upgrade pip

echo Installing PyTorch with CUDA support (adjust index-url if needed)...
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

echo Installing Ultralytics (YOLOv8)...
pip install ultralytics

echo.
echo ===================================================
echo YOLOv8 installation complete!
echo ===================================================
echo To activate the virtual environment later, run:
echo yolov8-env\Scripts\activate
echo.
pause
