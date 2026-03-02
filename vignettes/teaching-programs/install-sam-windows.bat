@echo off
echo ===================================================
echo SAM2 Installation Script for Windows
echo (Note: Defaulting to inference mode / SAM2_BUILD_CUDA=0)
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

echo Checking for Git...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in your PATH. 
    echo Please install Git.
    pause
    exit /b
)

echo Creating virtual environment "sam2-env"...
python -m venv sam2-env
if %errorlevel% neq 0 (
    echo [ERROR] Failed to create virtual environment.
    pause
    exit /b
)

echo Activating virtual environment...
call sam2-env\Scripts\activate.bat

echo Upgrading pip...
python -m pip install --upgrade pip

echo Cloning SAM2 repository...
if not exist "sam2" (
    git clone https://github.com/facebookresearch/sam2.git
) else (
    echo SAM2 repository already cloned.
)

cd sam2

echo Setting SAM2_BUILD_CUDA=0 for Windows native installation...
set SAM2_BUILD_CUDA=0

echo Installing SAM2...
pip install -e ".[notebooks]"

cd ..
echo.
echo ===================================================
echo SAM2 installation complete!
echo ===================================================
echo To activate the virtual environment later, run:
echo sam2-env\Scripts\activate
echo.
pause
