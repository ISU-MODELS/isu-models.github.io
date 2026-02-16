// Wrapper for local file access (bypassing CORS)
window.vignetteContent = `---

# Session 3: Structuring Programs

**© 2026 Ryan P. McGehee, Ph.D.**

## Introduction

In **Session 2**, we designed logical units using functions and classes. Now, we must assemble those components into a standardized architecture.

A well-structured program is not just a list of instructions; it is a **navigable document**. It must separate *configuration* from *logic*, and *definition* from *execution*.

**Goals:**
* Master the "Anatomy of a Module" (the standard Python file layout).
* Protect code from accidental execution using Guards.
* Build a Command Line Interface (CLI) to make your program dynamic.

---

## I. The Anatomy of a Module

### Principle: The Top-Down Standard

A Python file is a document that must be readable from top to bottom. Following a strict layout ensures that anyone opening your code immediately understands its dependencies and configuration.

**The Standard Layout:**
1.  **Shebang & Docstring:** *What* is this file?
2.  **Imports:** *What* does it need?
3.  **Global Constants:** *How* is it configured?
4.  **Definitions:** The actual logic (Classes/Functions).
5.  **Main Execution:** The entry point.

### Practice

**Visualizing the Skeleton:**
\`\`\`python
#!/usr/bin/env python3
"""
processor.py
Handles data ingestion and normalization for the WEPP model.
"""

import os                       # Standard Library
import sys

import numpy as np              # Third-Party Library
import pandas as pd

from my_lib import utils        # Local Application Imports

# --- Global Constants (Configuration) ---
DEFAULT_THRESHOLD = 0.05
MAX_ITERATIONS = 1000

# --- Function Definitions ---
def process_file(filepath):
    """Orchestrate the reading and processing."""
    pass

# --- Entry Point ---
if __name__ == "__main__":
    process_file(sys.argv[1])
\`\`\`

---

## II. Import Etiquette

### Principle: Predictability

Imports must always live at the **top of the file** (Global Scope). Hiding imports inside functions makes code harder to debug and slower to execute. We also sort them to distinguish between built-in tools and external dependencies.

### Practice

**The PEP 8 Sort Order:**
1.  **Standard Library** (e.g., \`os\`, \`sys\`, \`pathlib\`)
2.  **Third-Party** (e.g., \`numpy\`, \`pandas\`)
3.  **Local** (Modules you wrote)

**Bad Practice:**
\`\`\`python
def calculate_slope(dem):
    import numpy as np  # BAD: Hides dependency; import at top instead
    return np.gradient(dem)
\`\`\`

---

## III. Configuration vs. State

### Principle: The Scope Danger Zone

In **Session 2**, we discussed Local vs. Global variables. In a structured file, the Global scope is strictly for **Constants** (configuration).

**Never** use global variables for mutable program state (counters, flags, data). State must be passed *into* functions as arguments.

### Practice

**Correct (Constants):**
\`\`\`python
# Defined at top level
GRAVITY = 9.81  # Constant: Won't change

def compute_force(mass):
    return mass * GRAVITY
\`\`\`

**Incorrect (Mutable Global):**
\`\`\`python
current_count = 0  # Mutable: Changes during run

def increment():
    global current_count  # BAD: Breaks function purity
    current_count += 1
\`\`\`

---

## IV. The Execution Guard

### Principle: Importability

A Python file has two lives: as a **Script** (run via CLI) and as a **Library** (imported by other code). Without a guard, importing a file runs all its code immediately. We use the \`if __name__ == "__main__":\` block to isolate execution.

### Practice

**The Pattern:**
\`\`\`python
def main():
    """High-level orchestration."""
    print("Starting analysis...")

# This runs ONLY if executed via 'python script.py'
# This does NOT run if executed via 'import script'
if __name__ == "__main__":
    main()
\`\`\`

---

## V. The User Interface (CLI)

### Principle: Hardcoding vs. Arguments

A common mistake is "hardcoding" values inside your script.
* *Bad:* \`filename = "C:/Users/Ryan/data.csv"\`
* *Good:* Accepting the filename as an argument.

This transforms your script from a single-use artifact into a reusable tool. We use the built-in library \`argparse\` to handle this.

### Practice

**Using Argparse:**
\`\`\`python
import argparse

def main():
    # 1. Setup the "Parser" (The Listener)
    parser = argparse.ArgumentParser(description="Process WEPP Data.")
    
    # 2. Define expected arguments
    parser.add_argument("input_file", type=str, help="Path to input CSV")
    parser.add_argument("--verbose", action="store_true", help="Print detailed logs")

    # 3. Read the arguments
    args = parser.parse_args()

    # 4. Use them!
    print(f"Processing {args.input_file}...")
    if args.verbose:
        print("Verbose mode enabled.")

if __name__ == "__main__":
    main()
\`\`\`

---

## VI. The Directory Layout

### Principle: A Place for Everything

Structuring a program extends beyond the code file. It includes the folders that hold your project. A standardized directory structure helps you separate **Source Code** from **Data** and **Documentation**.

### Practice

**Standard Data Science/Engineering Layout:**
\`\`\`text
my_project/
│
├── data/               # Input data (Never edit raw data!)
│   ├── raw/
│   └── processed/
│
├── src/                # Source Code (Your Python scripts)
│   ├── __init__.py
│   ├── processing.py
│   └── plotting.py
│
├── notebooks/          # Jupyter Notebooks (For experimentation only)
│   └── exploratory.ipynb
│
├── README.md           # Instructions for humans
└── requirements.txt    # List of dependencies (numpy, pandas, etc.)
\`\`\`

---

## Conclusion

By completing this session, you have elevated your work from temporary scripts to permanent software tools. You now understand that a program's structure is just as important as its logic. By adhering to a standard module anatomy, you ensured your code is readable and navigable. By isolating configuration from state, you made your programs predictable. By implementing execution guards and command-line interfaces, you transformed static files into flexible, reusable utilities. And by organizing your project directory, you prepared your work for the collaborative reality of modern science. You are no longer just writing code; you are engineering software.

`;