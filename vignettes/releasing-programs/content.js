// Wrapper for local file access (bypassing CORS)
window.vignetteContent = `---

# Session 6: Releasing Programs

**© 2026 Ryan P. McGehee, Ph.D.**

## Introduction

Software is alive, but without constant care, it suffers from **software entropy**. Code that worked perfectly yesterday can "rot" today as dependencies shift, security vulnerabilities are discovered, and operating systems evolve. Releasing a program is more than just sharing a script; it marks a fundamental shift from "writing code" to **managing a product**. To ensure our work remains reliable, collaborative, and useful for years to come, we must build systems that protect code integrity. In this session, we will explore how to manage this transition by using industry-standard tools to ensure longevity and reliability.

We will use [The-Repo-Depot](https://github.com/ISU-MODELS/The-Repo-Depot) as our reference for industry-standard CI/CD practices in Python.

---

## I. Linting and Formatting

### Principle: Enforcing Code Style 

Imagine you are writing a novel. **Linting** is your spell-checker—it catches typos, syntax errors, and missing variables before you even try to run the code. **Formatting** is your grammar-checker—it ensures your indents, spacing, and quote marks are perfectly consistent, no matter which developer wrote them.

Code is read much more often than it is written. Linting enforces code style and catches common errors *without* modifying the code. Formatting ensures a consistent style across all contributors, preventing arguments over whether to use single or double quotes.

### Practice

**Tools:**
- **Ruff:** An extremely fast Python linter and code formatter.

**Configuration:**
In the \`pyproject.toml\` file, we can specify the "rules" of our grammar. For example, enforcing \`snake_case\` naming or limiting a function to a maximum of 25 lines.

**Example: Running Ruff**
If you run these commands in the \`The-Repo-Depot\` terminal:
\`\`\`bash
# Run linting (report violations but do not fix them)
ruff check . --no-fix

# Check formatting
ruff format --check .
\`\`\`

If you have a file that violates the rules you set in your configuration file, Ruff will flag it and fail. You can see an intentional failure by looking at the [\`module_with_issues.py\`](https://github.com/ISU-MODELS/The-Repo-Depot/blob/main/src/example_package/module_with_issues.py) file in the reference repository.

---

## II. Continuous Integration (CI)

### Principle: Automated Testing and Typing

Imagine submitting your homework and having the teacher grade it *instantly*. **Continuous Integration (CI)** is that teacher. Every time you commit code or open a pull request, CI automatically runs your tests and type checkers. This ensures that new changes do not break existing functionality (regression) and that data types remain consistent. It prevents broken code from ever merging into your main project.

### Practice

**Tools:**
- **Pytest:** For executing unit tests.
- **Coverage (pytest-cov):** To measure what percentage of your actual code is executed during those tests. If you wrote 100 lines of code, but your tests only check 20 lines, your coverage is a dangerous 20%.
- **Mypy:** For static type checking (ensuring a function that expects an \`int\` isn't accidentally passed a \`string\`).

**Example: A Simple Pytest**
From [\`tests/test_logic.py\`](https://github.com/ISU-MODELS/The-Repo-Depot/blob/main/tests/test_logic.py):
\`\`\`python
from example_package.logic import calculate_area

def test_calculate_area():
    # The 'assert' keyword tells Python: 
    # "If this statement is False, crash the test immediately."
    assert calculate_area(5, 10) == 50
\`\`\`

**Running CI:**
You can run these locally in your terminal to check your own work:
\`\`\`bash
pytest tests/ -v --cov=src --cov-report=term-missing
mypy src/
\`\`\`
However, humans forget. That is why we use **GitHub Actions**. By creating a YAML file (see [\`.github/workflows/ci.yml\`](https://github.com/ISU-MODELS/The-Repo-Depot/blob/main/.github/workflows/ci.yml)), GitHub will automatically spin up a server and run those exact commands for you on every single commit.

---

## III. Continuous Deployment (CD) and Matrix Testing

### Principle: Cross-Environment Compatibility 

If a car works perfectly in the sunny desert, does it also work in the snowy mountains? 

Your code might work perfectly on your Mac using Python 3.11, but will it work on your collaborator's Windows machine running Python 3.9? Continuous Deployment often relies on **Matrix Testing** to automatically test your code across many different "environments" before you release it to the public.

### Practice

**GitHub Actions Matrix:**
By defining a "matrix" in your GitHub Action (see [\`cd.yml\`](https://github.com/ISU-MODELS/The-Repo-Depot/blob/main/.github/workflows/cd.yml)), GitHub will multiply the variables together and run your tests on *all* combinations simultaneously.

**Example CD Matrix Configuration:**
\`\`\`yaml
strategy:
  matrix:
    # Test on these three Operating Systems
    os: [ubuntu-latest, windows-latest, macos-latest]
    # And test on these four Python versions
    python-version: ["3.9", "3.10", "3.11", "3.12"]
    # And test with minimal vs. strict dependencies
    dependency-set: [min, pinned]
\`\`\`
In this example, GitHub will run your tests 24 different times (3 OS × 4 Python Versions × 2 Dependency Sets) to guarantee maximum compatibility.

---

## IV. Automating Security and Builds

### Principle: Secure and Distributable Code

Before a program is released, it must pass through airport security. We must audit it for known vulnerabilities—like an outdated dependency that hackers know how to exploit—and ensure we haven't accidentally committed passwords or API keys. Finally, we package the code into a distributable box so others can install it easily.

### Practice

**Security Scanning:**
- **pip-audit:** Scans your list of dependencies against a database of known CVEs (Common Vulnerabilities and Exposures).
- **Gitleaks:** Scans your codebase for accidentally committed secrets. Once a password is pushed to GitHub, it is compromised forever.

**Building the Package:**
When people type \`pip install your_package\`, they are downloading a built distribution file (often called a \`.wheel\` or \`.tar.gz\`). We automate this build process using standard Python tools:
\`\`\`bash
# This creates the distribution files based on the metadata 
# you provided in your pyproject.toml
python -m build
\`\`\`

---

## Conclusion

By integrating these practices—Linting, CI, CD, Security Scanning, and Automated Builds—you transform a collection of scripts into a robust, professional software product. The [The-Repo-Depot](https://github.com/ISU-MODELS/The-Repo-Depot) repository serves as a blueprint for setting up these workflows using GitHub Actions.

### Assignment
Now let's apply these CI/CD principles to our own projects. Your task is to implement a basic GitHub Action that runs \`ruff\` and \`pytest\` on every push to your main branch. 

**Steps:**
1.  **Read the Guide:** Open [\`LEARNING.md\`](https://github.com/ISU-MODELS/The-Repo-Depot/blob/main/LEARNING.md) in the reference repository to understand how the workflows connect.
2.  **Lint Locally:** Install Ruff and run it on your own project. Fix any style violations it finds.
3.  **Test Locally:** Write at least one Pytest for a core function in your project and ensure it passes.
4.  **Create the Workflow:** In your project's repository, create a \`.github/workflows/\` folder.
5.  **Copy and Adapt:** Copy the \`ci.yml\` and \`lint.yml\` files from the reference repository into your new folder. Read the comments inside them and adapt them to your project's specific needs.
6.  **Push and Verify:** Push your changes to GitHub to trigger the Actions. Click the "Actions" tab in your repository to watch the servers automatically test your code in real-time.

---
`;