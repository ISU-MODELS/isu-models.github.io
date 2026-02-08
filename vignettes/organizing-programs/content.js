
// Wrapper for local file access (bypassing CORS)
window.vignetteContent = `---

# Session 3: Organizing Programs

**© 2026 Ryan P. McGehee, Ph.D.**

## Introduction

- Overview of why program organization matters for readability and maintainability.
- The concept of "Code as Communication" (to humans and machines).
- Goals: Standardizing file structure, import ordering, and execution flow.

---

## Metadata

### Principle: Self-Documentation
- The importance of docstrings and module-level documentation.
- Including license information (e.g., MIT, GPL).
- Versioning variables (\`__version__\`).

### Practice
- Writing a module-level docstring.
- Adding \`__author__\`, \`__email__\`, and \`__status__\` variables.
- Using standardized license headers.

---

## Library Imports

### Principle: Order and Structure
- The cost of imports (load time, memory).
- Handling circular dependencies.
- Namespace pollution (avoiding \`from module import *\`).

### Practice
- Grouping imports:
    1.  Standard Library (e.g., \`os\`, \`sys\`, \`json\`)
    2.  Third-Party Libraries (e.g., \`numpy\`, \`pandas\`)
    3.  Local Application/Library Imports
- Using absolute vs relative imports.
- Removing unused imports.

---

## Global Variables

### Principle: Constants and Configuration
- Difference between true globals (mutable state, bad) and constants (configuration, good).
- Naming conventions (\`UPPER_CASE\` for constants).
- scope and lifetime of global variables.

### Practice
- Defining configuration constants at the top of the file.
- Using environment variables for secrets instead of hardcoding.
- Minimizing the use of the \`global\` keyword inside functions.

---

## Functions

### Principle: Modular Logic
- The Single Responsibility Principle (SRP).
- Defining functions before they are called.
- Separation of concerns (Logic vs I/O).

### Practice
- Ordering functions: Helper functions first, then core logic, or vice-versa (choose a consistent style).
- Writing clear function signatures with type hints.
- Using separate files for utility functions if the file grows too large.

---

## Main Execution

### Principle: Entry Points
- The \`if __name__ == "__main__": \` idiom.
- Ensuring code doesn't run when imported as a library.
- separating defining code from running code.

### Practice
- Wrapping the main execution logic in a \`main()\` function.
- Parsing command-line arguments inside the entry point block.
- Calling \`sys.exit()\` with appropriate status codes.

---
`;
