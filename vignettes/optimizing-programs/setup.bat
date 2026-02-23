@echo off
echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing requirements...
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

echo Setup complete. To activate the virtual environment, run: venv\Scripts\activate
