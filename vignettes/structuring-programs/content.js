
// Wrapper for local file access (bypassing CORS)
window.vignetteContent = `---

# Session 3: Structuring Programs

**© 2026 Ryan P. McGehee, Ph.D.**

## Introduction

- Overview of why program organization matters for readability and maintainability.
- The concept of "Code as Communication" (to humans and machines).
- Goals: Standardizing file structure, import ordering, and execution flow.

---

## I. Defining Classes

### Principle: Objects, Attributes, Methods

Functions are great for actions, but sometimes we need to bundle data (attributes) and actions (methods) together. This is **Object-Oriented Programming (OOP)**. In Machine Learning (Session 5), models are defined as Classes (e.g., \`class Net(nn.Module):\`), so understanding this structure is vital.

A **Class** is a blueprint (like "Student"). An **Object** is a specific instance built from that blueprint (like "Ryan").

### Practice

**Defining a Class:**
\`\`\`python
class Student:
    def __init__(self, name, grade):
        self.name = name        # Attribute
        self.grade = grade      # Attribute

    def promote(self):          # Method
        self.grade += 1
        print(f"{self.name} is now in grade {self.grade}")

# Creating Objects
student1 = Student("Ryan", 12)
student1.promote()
\`\`\`

---

## II. Tracking History

### Principle: Version Control

If the goal is "contributing to science," Git is the primary tool for that. Organizing code includes organizing its history.

- **Source of Truth:** Git tracks every change, allowing you to revert errors and collaborate without overwriting each other's work.
- **Git as Standard:** It is the industry standard for version control.

### Practice

**Git Basics:**
- **Initialize:** \`git init\` inside your project folder.
- **Stage & Commit:**
    - \`git add .\` (Stage all changes)
    - \`git commit -m "Initial commit"\` (Save snapshot with message)
- **Ignore:** Create a \`.gitignore\` file to exclude \`__pycache__\`, \`.DS_Store\`, and other temp files.

---

## III. Organizing Modules

### Principle: Imports & Structure

- The cost of imports (load time, memory).
- Handling circular dependencies.
- Namespace pollution (avoiding \`from module import *\`).

### Practice

**Grouping Imports:**
1.  Standard Library (e.g., \`os\`, \`sys\`, \`json\`)
2.  Third-Party Libraries (e.g., \`numpy\`, \`pandas\`)
3.  Local Application/Library Imports

**Usage:**
- Use absolute imports (\`from mypackage.module import func\`) over relative imports for clarity.
- Remove unused imports to keep the namespace clean.

---

## IV. Configuring Globals

### Principle: Constants & Environment

- Difference between true globals (mutable state, bad) and constants (configuration, good).
- Naming conventions (\`UPPER_CASE\` for constants).
- Scope and lifetime of global variables.

### Practice

**Constants:**
Define configuration constants at the top of the file:
\`\`\`python
MAX_RETRIES = 5
DEFAULT_TIMEOUT = 30
\`\`\`

**Secrets:**
Use environment variables (\`os.environ\`) for API keys and passwords instead of hardcoding them in the script.

---

## V. Controlling Entry

### Principle: Entry Points

When you run a Python file, the interpreter executes everything at level 0 indentation. To prevent code from running when a file is merely *imported* by another script, we use an entry point guard.

### Practice

**The Guard:**
\`\`\`python
def main():
    print("Program logic here")

if __name__ == "__main__":
    main()
\`\`\`

This ensures \`main()\` runs only when you execute \`python script.py\`, not when you do \`import script\`.

---
`;