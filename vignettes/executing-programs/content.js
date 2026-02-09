
// Wrapper for local file access (bypassing CORS)
window.vignetteContent = `---

# Session 1: Executing Programs

**© 2026 Ryan P. McGehee, Ph.D.** 

## Introduction

Welcome to the first session on program execution. Understanding how to execute programs, manage environments, and manipulate data streams is foundational to computational science. 

In this session, we will move beyond simply writing code to understanding the ecosystem in which it lives. By the end of this module, you will be able to install Python, manage libraries, create isolated development environments, and master the command line interface (CLI) for passing and piping arguments. 

---

## I. Installing the Environment

### Principle: The Ecosystem
Before writing code, you must ensure your machine can interpret it and you have a proper tool to edit it. This involves setting up the Python interpreter and an Integrated Development Environment (IDE).

**Stable Releases:**
Python releases come in "stable" and "beta" versions. For professional and academic work, always prioritize **stable** releases to ensure compatibility with scientific libraries.

**IDEs:**
While code is just text, using a dedicated IDE like VS Code is critical for efficiency. Unlike rich text editors, IDEs provide syntax highlighting, error checking, and proper file encoding.

### Practice

**1. Install Python:**
Download the latest stable release from [python.org/downloads](https://python.org/downloads).
* **Windows:** Check **"Add Python to PATH"**.
* **Mac:** Use **Homebrew** (\`brew install python\`) or the official installer.
* **Linux:** Use your package manager (e.g., \`sudo apt install python3\`).

**Verify Installation:**
Open your terminal/command prompt and run:
\`\`\`bash
python --version   # Windows/General
python3 --version  # Mac/Linux often distinguishes python 2 vs 3
\`\`\`

**2. Install VS Code:**
* Download from [code.visualstudio.com](https://code.visualstudio.com/).
* Install the **Python extension** for syntax highlighting.
* **Create Workspace:** Create a folder \`computational_bootcamp\` and open it in VS Code.
* **Select Interpreter:** Use \`Cmd/Ctrl + Shift + P\` > "Python: Select Interpreter".

---

## II. Navigating File Systems

### Principle: Paths & Permissions
When you run a command, the computer looks for files in your **Current Working Directory (CWD)**. To access files elsewhere, you must specify their path. Additionally, every file has permissions (Read, Write, Execute) that control who can access it.

*   **Absolute Path**: Full address from root (e.g., \`/Users/me/script.py\`).
*   **Relative Path**: Location relative to CWD (e.g., \`lab1/run.py\`).
*   **Global Path**: Directories where the OS looks for commands (e.g., \`/usr/local/bin\`).

### Practice

**Navigating:**
1.  **Relative:** \`python lab1/run.py\`
2.  **Absolute:** \`python /Users/student/lab1/run.py\`

**Managing Permissions:**
If you get "Permission denied," you likely need **Execute (x)** permission.
*   **Mac/Linux:** \`chmod +x script.sh\`
*   **Windows:** Use \`icacls\` or Right-click > Properties > Security.

---

## III. Automating Execution

### Principle: CLI & Troubleshooting
A Command Line Interface (CLI) allows you to automate tasks and run programs effectively. However, errors are inevitable. Python crashes output a **Traceback**, which reports the error message (bottom) and location (top).

### Practice

**Running Scripts:**
1. Download **[demoPrintScript.py](demoPrintScript.py)** to your workspace.
2. Run it via terminal:
\`\`\`bash
python demoPrintScript.py
\`\`\`

**Tracing Errors:**
If you see \`FileNotFoundError\`:
1.  **Verify Location:** Run \`pwd\` (Mac/Linux) or \`cd\` (Windows) to check your CWD.
2.  **Fix Filename:** Use **Tab** key to auto-complete filenames to avoid typos.

**Challenge:**
[Download](demoPrintArgScript.py) **\`demoPrintArgScript.py\`**. Try running it with your name as an argument.

---

## IV. Managing Dependencies

### Principle: Packages & Isolation
You should never install project-specific libraries into your system's global Python. **Virtual Environments** create isolated spaces for each project, ensuring that dependencies (managed via \`pip\`) don't conflict.

### Practice

**1. Create Environment:**
\`\`\`bash
python -m venv myEnv
\`\`\`

**2. Activate Environment:**
*   **Mac/Linux:** \`source myEnv/bin/activate\`
*   **Windows:** \`myEnv\\scripts\\activate\`

**3. Install Packages:**
*   **Single:** \`pip install numpy\`
*   **From Requirements:** [Download](requirements.txt) **\`requirements.txt\`** and run:
    \`\`\`bash
    pip install -r requirements.txt
    \`\`\`

---

## V. Streaming Data

### Principle: Arguments & Pipes
Advanced execution involves passing data into programs at runtime using **Arguments** (flags) or **Piping** (chaining outputs to inputs).

*   **Arguments:** \`python script.py --name "Ryan"\` (Accessible via \`sys.argv\` or \`argparse\`).
*   **Piping:** \`echo "Hello" | python script.py\` (Feeds "Hello" into script's \`stdin\`).

### Practice

**Arguments:**
[Download](demoArgParseScript.py) **\`demoArgParseScript.py\`**.
\`\`\`bash
python demoArgParseScript.py -h       # Help menu
python demoArgParseScript.py --name "Ryan"
\`\`\`

**Piping:**
[Download](demoStdinScript.py) **\`demoStdinScript.py\`**.
Pipe data into it:
\`\`\`bash
echo "Hello World" | python demoStdinScript.py
\`\`\`

---

## Conclusion

Congratulations on completing Session 1. You can now execute programs, manage environments, and control data streams—the invisible infrastructure of computational science.

---
`;
