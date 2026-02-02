---

# Session 1: Executing Programs

**© 2025 Ryan P. McGehee, Ph.D.** 

## Introduction

Welcome to the first session on program execution. Understanding how to execute programs, manage environments, and manipulate data streams is foundational to computational science. 

In this session, we will move beyond simply writing code to understanding the ecosystem in which it lives. By the end of this module, you will be able to install Python, manage libraries, create isolated development environments, and master the command line interface (CLI) for passing and piping arguments. 

---

## Installing Python

### Principle: Stable Releases

Before writing code, you must ensure your machine can interpret it. Python releases come in "stable" and "beta" versions. For professional and academic work, always prioritize **stable** releases to ensure compatibility with scientific libraries. 

### Practice

Download the latest stable release from [python.org/downloads](https://python.org/downloads).

**Installation Tips:**

* **Windows:** During installation, you **must** check the box labeled **"Add Python to PATH"**. This allows you to run Python from any command prompt. 


* **Mac:** While the official installer works, many developers prefer using **Homebrew** (`brew install python`) for easier management. 


* **Linux:** Use your distribution's package manager (e.g., `sudo apt install python3` or `yum`). 



**Verification:**
Open your terminal (Mac/Linux) or Command Prompt (Windows) and type the following to verify the installation: 

```bash
# Windows / General
python --version

# Mac / Linux (often distinguishes python 2 vs 3)
python3 --version

```



You can also enter an interactive Python session by simply typing `python`. To exit this session, type `exit()`. 

---

## Installing VS Code

### Principle: IDEs

While code is just text, using a dedicated Integrated Development Environment (IDE) like VS Code is critical for workflow efficiency. Unlike rich text editors (like Word), which add hidden formatting characters that break scripts, IDEs provide syntax highlighting, error checking, and proper file encoding. 

### Practice

1. Download VS Code from [code.visualstudio.com](https://code.visualstudio.com/).


2. Install the **Python extension** from the marketplace to enable syntax highlighting and IntelliSense. 



---

## Executing Programs

### Principle: CLIs

A Command Line Interface (CLI) is a text-based method for interacting with your computer. It allows you to run programs precisely and automate tasks that would be tedious in a graphical interface. 

Common syntax includes:

* 
`python script.py` (Executes a Python script) 


* 
`./script.sh` (Executes a shell script) 



### Practice

[Download](demoPrintScript.py) the example script: **`demoPrintScript.py`**

1. Navigate to the folder containing the downloaded script in your terminal.
2. Run the script:
```bash
python demoPrintScript.py

```






**Challenge:**
[Download](demoPrintArgScript.py) **`demoPrintArgScript.py`**. This script uses `sys.argv` to inspect command line inputs. Try running it with your name as an argument and modify the code to print a personalized greeting. 

---

## Managing Libraries

### Principle: Package Managers

Python's power lies in its ecosystem. We use **Package Managers** like `pip` (Python) or `npm` (Node.js) to automate the installation and maintenance of third-party libraries. 

**Dependency Management** is crucial for reproducibility. It ensures that if you share your code, others have the exact versions of the libraries you used. 

### Practice

**Installing a Single Package:**
To install a library like `numpy`, run: 

```bash
pip install numpy

```

**Installing from Requirements:**
For complex projects, we use a `requirements.txt` file to list specific versions. [Download](requirements.txt) the example **`requirements.txt`** and run: 

```bash
pip install -r requirements.txt

```

**Managing Packages:**

* Check installed packages: `pip list` 


* Get details on a package: `pip show numpy` 


**Reset/Uninstall:** To uninstall a list of packages (useful for cleaning an environment): 


```bash
pip freeze > packages_to_uninstall.txt
pip uninstall -r packages_to_uninstall.txt -y

```



---

## Creating Environments

### Principle: Isolation

You should never install project-specific libraries directly into your system's global Python environment. Doing so can cause conflicts where one project needs Version 1.0 of a tool and another needs Version 2.0. **Virtual Environments** solve this by creating isolated spaces for each project. 

### Practice

**1. Create the Environment:**

```bash
python -m venv myEnv

```



**2. Activate the Environment:**

* **UNIX (Mac/Linux):**
```bash
source myEnv/bin/activate

```





* **Windows:**
```bash
source myEnv\scripts\activate

```






**3. Verify Isolation:**
Once activated, try installing a package. Then `deactivate` the environment  and check if that package is still available. You will find it is contained strictly within `myEnv`. 

---

## Handling Arguments

### Principle: Argument Passing

Arguments allow you to pass variables into a program at runtime without editing the code. In Python, these are accessible via `sys.argv` (basic) or the `argparse` library (robust). Standard flags like `-h` (help) or `-v` (version) are conventions you should adhere to. 

### Principle: I/O Piping

Piping (`|`) allows the output (stdout) of one command to be used immediately as the input (stdin) for another command. This chains operations together efficiently. 

### Practice

**Argument Parsing:**
[Download](demoArgParseScript.py) **`demoArgParseScript.py`**. Unlike the basic script, this uses the `argparse` library to automatically generate help menus and handle flags.

Try the following:

```bash
python demoArgParseScript.py -h       # View the auto-generated help menu
python demoArgParseScript.py -v       # Check version
python demoArgParseScript.py --name "Ryan"

```



**Piping Input:**
[Download](demoStdinScript.py) **`demoStdinScript.py`**.
If you run this script alone (`python demoStdinScript.py`), it will appear to "hang." It is waiting for input that never arrives. You would need to press `Ctrl + C` (or `Cmd + C`) to abort it. 

Instead, pipe data into it using the `echo` command:

```bash
echo "Hello World" | python demoStdinScript.py

```

The script immediately processes "Hello World" because the output of `echo` was piped directly into the script's standard input.

---
