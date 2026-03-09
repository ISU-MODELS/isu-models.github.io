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

Code is read much more often than it is written. Linting enforces code style and catches common errors *without* modifying the code. Formatting ensures a consistent style across all contributors. 

### Practice

**Tools:**
- **Ruff:** An extremely fast Python linter and code formatter.

**Configuration:**
In \`pyproject.toml\`, we can specify rules. For example, enforcing \`snake_case\` naming or limiting function length.

**Example: Running Ruff**
\`\`\`bash
# Run linting (report violations but do not fix them)
ruff check . --no-fix

# Check formatting
ruff format --check .
\`\`\`

If you have a file that violates these rules (like [\`module_with_issues.py\`](https://github.com/ISU-MODELS/The-Repo-Depot/blob/main/src/example_package/module_with_issues.py)), Ruff will flag it and fail the CI check.

---

## II. Continuous Integration (CI)

### Principle: Automated Testing and Typing

Continuous Integration (CI) automatically runs tests and type checkers on every commit or pull request. This ensures that new changes do not break existing functionality (regression) and that types remain consistent.

### Practice

**Tools:**
- **Pytest:** For unit testing.
- **Coverage (pytest-cov):** To measure what percentage of code is executed during tests.
- **Mypy:** For static type checking.

**Example: A Simple Pytest**
From [\`tests/test_logic.py\`](https://github.com/ISU-MODELS/The-Repo-Depot/blob/main/tests/test_logic.py):
\`\`\`python
from example_package.logic import calculate_area

def test_calculate_area():
    assert calculate_area(5, 10) == 50
\`\`\`

**Running CI Locally:**
\`\`\`bash
pytest tests/ -v --cov=src --cov-report=term-missing
mypy src/
\`\`\`
In GitHub Actions, these commands run automatically (see [\`.github/workflows/ci.yml\`](https://github.com/ISU-MODELS/The-Repo-Depot/blob/main/.github/workflows/ci.yml)).

---

## III. Continuous Deployment (CD) and Matrix Testing

### Principle: Cross-Environment Compatibility 

Your code might work on your Mac with Python 3.11, but will it work on Windows with Python 3.9? Continuous Deployment often includes **Matrix Testing** to test code across many environments before releasing.

### Practice

**GitHub Actions Matrix:**
By defining a matrix in [\`cd.yml\`](https://github.com/ISU-MODELS/The-Repo-Depot/blob/main/.github/workflows/cd.yml), GitHub will run your tests on all combinations of the provided variables.

**Example CD Matrix Configuration:**
\`\`\`yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    python-version: ["3.9", "3.10", "3.11", "3.12"]
    dependency-set: [min, pinned]
\`\`\`
This ensures maximum compatibility across different operating systems and Python versions.

---

## IV. Automating Security and Builds

### Principle: Secure and Distributable Code

Before a program is released, it must be audited for known vulnerabilities (e.g., in dependencies) and built into a distributable format (like a \`.wheel\` or \`.tar.gz\`).

### Practice

**Security Scanning:**
- **pip-audit:** Scans dependency trees for known CVEs (vulnerabilities).
- **Gitleaks:** Scans your codebase for accidentally committed secrets (like API keys).

**Building the Package:**
Using standard Python packaging tools:
\`\`\`bash
python -m build
\`\`\`
This creates the distribution files based on your [\`pyproject.toml\`](https://github.com/ISU-MODELS/The-Repo-Depot/blob/main/pyproject.toml).

---

## Conclusion

By integrating these practices—Linting, CI, CD, Security Scanning, and Automated Builds—you transform a collection of scripts into a robust, professional software product. The [The-Repo-Depot](https://github.com/ISU-MODELS/The-Repo-Depot) repository serves as a blueprint for setting up these workflows using GitHub Actions.

---
\`;