
// Wrapper for local file access (bypassing CORS)
window.vignetteContent = `---

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

* **Mac:** While the official installer works, many developers prefer using **Homebrew** (\`brew install python\`) for easier management. 

* **Linux:** Use your distribution's package manager (e.g., \`sudo apt install python3\` or \`yum\`). 


**Verification:**
Open your terminal (Mac/Linux) or Command Prompt (Windows) and type the following to verify the installation: 

\`\`\`bash
# Windows / General
python --version

# Mac / Linux (often distinguishes python 2 vs 3)
python3 --version

\`\`\`

You can also enter an interactive Python session by simply typing \`python\`. To exit this session, type \`exit()\`. 

---

## Installing VS Code

### Principle: IDEs

While code is just text, using a dedicated Integrated Development Environment (IDE) like VS Code is critical for workflow efficiency. Unlike rich text editors (like Word), which add hidden formatting characters that break scripts, IDEs provide syntax highlighting, error checking, and proper file encoding. 

### Practice

1. Download VS Code from [code.visualstudio.com](https://code.visualstudio.com/).

2. Install the **Python extension** from the marketplace to enable syntax highlighting and IntelliSense. 

3. **Create Workspace:** create a folder named \`computational_bootcamp\` on your Desktop or Documents folder. Open VS Code and use \`File > Open Folder\` to select this new directory. This will be your workspace for the session.

4. **Select Interpreter:** Press \`Cmd + Shift + P\` (Mac) or \`Ctrl + Shift + P\` (Windows) to open the Command Palette. Type "Python: Select Interpreter" and choose the version that matches the virtual environment created later in the lesson. 

---

## Specifying File Paths

### Principle: File Systems & Paths

When you open a terminal, you are always "in" a specific folder, known as your **Current Working Directory (CWD)**. You can see which directory you are in by typing \`pwd\` (Print Working Directory) on Mac/Linux or \`cd\` on Windows.

When you run a command like \`python script.py\`, the computer looks for \`script.py\` *only* in your CWD. If the file is elsewhere, you must tell the computer exactly where it is using a path.

*   **Absolute Path**: The full address of a file, starting from the root of the computer.
    *   *Example:* \`/Users/username/Documents/Projects/script.py\`
    *   *Analogy:* "Go to 123 Main Street, New York, NY" (Anyone can navigate to this address)

*   **Relative Path**: The location of a file *relative* to your current folder.
    *   *Example:* \`Projects/script.py\` (assuming you are in \`Documents\`)
    *   *Analogy:* "Go down the street and turn left" (Only works if you are already in the vicinity)

*   **Global Path:** The "Path" is a list of trusted directories stored by your operating system. When you type a command (like \`python\` or \`ls\`) without a path, the computer looks in these directories to find it. Programs stored here can be called from **anywhere** on the device.
    *   *Example:* \`/usr/local/bin\` (Mac/Linux); \`C:\Windows\System32\` (Windows)
    *   *Analogy:* "Go to the White House" (Everyone knows where it is already)

**Tip:** You can use \`cd\` (Change Directory) to move your CWD to the folder containing your script, or you can provide the full path to the script when running it.

**Adding to the Global Path:**
To make your own program globally executable, you typically create a "symbolic link" (shortcut) in a global directory like \`/usr/local/bin\` (Mac/Linux) or \`C:\Windows\System32\` (Windows).

**Mac/Linux:**
\`\`\`bash 
# Syntax: sudo ln -s [Absolute Path to Script] [Global Directory/NewName]
sudo ln -s /Users/me/myscript.sh /usr/local/bin/myscript
\`\`\`

**Windows:**
\`\`\`cmd
# Syntax: mklink [Global Directory/NewName] [Absolute Path to Script]
mklink "C:\Windows\System32\myscript" "C:\Users\me\myscript.sh"
\`\`\`

### Practice

Let's assume you have created your \`computational_bootcamp\` folder on your Desktop.

1.  **Execute using Relative Path:**
    \`\`\`bash
    python lab1/run.py
    \`\`\`

2.  **Execute using Absolute Path:**
    \`\`\`bash
    python /Users/student/lab1/run.py
    \`\`\`

3.  **Execute using Global Path:**
    (If installed/linked to the path as \`run\`)
    \`\`\`bash
    run
    \`\`\`

---


## File Permissions

### Principle: Access Control

Every file on your computer has a set of "permissions" that tell the operating system who is allowed to read, write, or execute it. This is a critical security feature.

*   **Read (r):** View the file's contents.
*   **Write (w):** Modify or delete the file.
*   **Execute (x):** Run the file as a program.

If you try to run a script and get a "Permission denied" error, it usually means the *Execute* permission is missing.

### Practice

**Checking Permissions:**

To see a file's permissions, you can inspect it in your terminal:

*   **Mac/Linux:** Run \`ls -l\`. You will see a string like \`-rw-r--r--\`. The presence of an \`x\` indicates executable permission. 
*   **Windows:** Right-click the file, select **Properties**, and view the **Security** tab.

**Changing Permissions:**

**Mac/Linux (chmod):**
On Unix-based systems, use the \`chmod\` (Change Mode) command to make a script executable (add \`+x\`):

\`\`\`bash
chmod +x script.sh
\`\`\`

**Windows (icacls):**

Windows permissions are more complex (using ACLs), but you can modify them via the command line using \`icacls\`. To grant full access to a current user:

\`\`\`cmd
icacls script.py /grant Users:F
\`\`\`
*(Note: \`F\` stands for Full access)*

Alternatively, you can use the GUI: Right-click file > Properties > Security > Edit > Check "Full control".

---

## Executing Programs

### Principle: CLIs

A Command Line Interface (CLI) is a text-based method for interacting with your computer. It allows you to run programs precisely and automate tasks that would be tedious in a graphical interface. 

Common syntax includes:

* \`python script.py\` (Executes a Python script) 

* \`./script.sh\` (Executes a shell script) 

### Practice

1. Download the example script: **[demoPrintScript.py](demoPrintScript.py)** and save it into your \`computational_bootcamp\` folder.
2. In VS Code, open the terminal (\`Ctrl + \`\`) and ensure you are in the \`computational_bootcamp\` directory.
3. Run the script:

\`\`\`bash
python demoPrintScript.py

\`\`\`

**Challenge:**
[Download](demoPrintArgScript.py) **\`demoPrintArgScript.py\`**. This script uses \`sys.argv\` to inspect command line inputs. Try running it with your name as an argument and modify the code to print a personalized greeting. 

---

## Tracing Errors

### Principle: Traceback

Errors are a normal part of programming. When a Python script crashes, it outputs a **Traceback**. This is a report that reads from bottom to top:

1.  **The Error Message** (Bottom): What went wrong (e.g., \`FileNotFoundError\`, \`SyntaxError\`).
2.  **The Location** (Top/Middle): The exact file and line number where the crash happened.

### Practice

**File Not Found Error:**
If you see: \`python: can't open file 'script.py': [Errno 2] No such file or directory\`

This usually means you are in the wrong folder (CWD) or made a typo in the filename.

**1. Verify your location:**

*   **Mac/Linux:**
    \`\`\`bash
    pwd  # specific command to check where you are
    ls   # list files
    \`\`\`

*   **Windows:**
    \`\`\`cmd
    cd   # check where you are (cd with no arguments prints CWD)
    dir  # list files
    \`\`\`

**2. Fix the filename:**

*   **Tip:** Use the **Tab** key to auto-complete filenames. This prevents typos and confirms the file exists.

---

## Managing Libraries

### Principle: Package Managers

Python's power lies in its ecosystem. We use **Package Managers** like \`pip\` (Python) or \`npm\` (Node.js) to automate the installation and maintenance of third-party libraries. 

**Dependency Management** is crucial for reproducibility. It ensures that if you share your code, others have the exact versions of the libraries you used. 

### Practice

**Installing a Single Package:**
To install a library like \`numpy\`, run: 

\`\`\`bash
pip install numpy

\`\`\`

**Installing from Requirements:**
For complex projects, we use a \`requirements.txt\` file to list specific versions. [Download](requirements.txt) the example **\`requirements.txt\`** and run: 

\`\`\`bash
pip install -r requirements.txt

\`\`\`

**Managing Packages:**

* Check installed packages: \`pip list\` 

* Get details on a package: \`pip show numpy\` 

**Reset/Uninstall:** To uninstall a list of packages (useful for cleaning an environment): 

\`\`\`bash
pip freeze > packages_to_uninstall.txt
pip uninstall -r packages_to_uninstall.txt -y

\`\`\`

---

## Creating Environments

### Principle: Isolation

You should never install project-specific libraries directly into your system's global Python environment. Doing so can cause conflicts where one project needs Version 1.0 of a tool and another needs Version 2.0. **Virtual Environments** solve this by creating isolated spaces for each project. 

**Note for Scientists:** While we use Python's built-in \`venv\` module in this vignette, complex scientific workflows often require non-Python dependencies (e.g., GDAL for geospatial work). For such tasks, **Conda** or **Mamba** environments are often preferred as they manage both Python and system-level libraries. 

### Practice

**1. Create the Environment:**

\`\`\`bash
python -m venv myEnv

\`\`\`

**2. Activate the Environment:**

* **UNIX (Mac/Linux):**
\`\`\`bash
source myEnv/bin/activate

\`\`\`

* **Windows:**
\`\`\`bash
source myEnv\\scripts\\activate

\`\`\`

**3. Verify Isolation:**
Once activated, try installing a package. Then \`deactivate\` the environment  and check if that package is still available. You will find it is contained strictly within \`myEnv\`. 

---

## Passing Arguments

### Principle: Passing

Arguments allow you to pass variables into a program at runtime without editing the code. In Python, these are accessible via \`sys.argv\` (basic) or the \`argparse\` library (robust). Standard flags like \`-h\` (help) or \`-v\` (version) are conventions you should adhere to. 

### Practice

[Download](demoArgParseScript.py) **\`demoArgParseScript.py\`** into your workspace. Unlike the basic script, this uses the \`argparse\` library to automatically generate help menus and handle flags.

Try the following:

\`\`\`bash
python demoArgParseScript.py -h       # View the auto-generated help menu
python demoArgParseScript.py -v       # Check version
python demoArgParseScript.py --name "Ryan"

\`\`\`

---

## Piping Input & Output

### Principle: Piping

Piping (\`|\`) allows the output (stdout) of one command to be used immediately as the input (stdin) for another command. This chains operations together efficiently. 

### Practice

[Download](demoStdinScript.py) **\`demoStdinScript.py\`** into your workspace.
If you run this script alone (\`python demoStdinScript.py\`), it will appear to "hang." It is waiting for input that never arrives. You would need to press \`Ctrl + C\` (or \`Cmd + C\`) to abort it. 

Instead, pipe data into it using the \`echo\` command:

\`\`\`bash
echo "Hello World" | python demoStdinScript.py

\`\`\`

The script immediately processes "Hello World" because the output of \`echo\` was piped directly into the script's standard input.

---

## Conclusion

Congratulations on completing your first session. You have transitioned from simply "using" software to **engineering** it. 

By mastering these fundamentals, you are now equipped to:

*   **Build Reproducible Science:** Using virtual environments and \`requirements.txt\` ensures your research can be verified and built upon by others (including your future self).
*   **Automate Workflows:** passing arguments and piping inputs allows you to run hundreds of simulations without manually editing a single line of code.
*   **Debug with Confidence:** Understanding paths, permissions, and tracebacks turns scary error messages into solvable logic puzzles.

These skills are the invisible infrastructure of every advanced software project. As we move forward, we will rely on this foundation to build complex, data-driven applications.

---
`;
