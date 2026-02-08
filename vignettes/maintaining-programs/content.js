
// Wrapper for local file access (bypassing CORS)
window.vignetteContent = `---

# Session 6: Maintaining Programs

**© 2026 Ryan P. McGehee, Ph.D.**

## Introduction

- Software entropy: Code rots if not maintained.
- The shift from "writing code" to "managing a product".
- Ensuring longevity, collaboration, and reliability.

---

## Version Control

### Principle: History and Collaboration
- Source of truth for codebases.
- Tracking changes, reverting errors, and parallel development.
- Git as the industry standard.

### Practice
- **Git Basics:**
    - Initializing repositories (\`git init\`).
    - Staging and Committing (\`git add\`, \`git commit\`).
    - Ignoring files (\`.gitignore\`).
- **Branching Strategies:**
    - Feature branches vs Main/Master.
    - Pull Requests (PRs) and Code Reviews.
    - Handling merge conflicts.

---

## Linting and Code Quality

### Principle: Static Analysis
- Catching errors before execution.
- Enforcing style consistency (PEP8).
- Reducing cognitive load for readers.

### Practice
- **Linters:**
    - Using \`flake8\` or \`pylint\` for logic and style errors.
    - Configuring rules and exceptions (\`.flake8\` config).
- **Formatters:**
    - Using \`black\` or \`autopep8\` for automatic formatting.
    - "Format on Save" editor integration.
- **Type Checking:**
    - Using \`mypy\` for static type enforcement.

---

## Unit Tests

### Principle: Verification
- Testing small, isolated units of code.
- Test-Driven Development (TDD) philosophy.
- Guarding against regressions (breaking existing features).

### Practice
- Writing test cases with \`unittest\` or \`pytest\`.
- Structuring test directories (\`tests / \` folder).
- Mocking external dependencies (databases, APIs).
- Measuring Test Coverage (percentage of code executed during tests).

---

## CI/CD and Documentation

### Principle: Automation
- Continuous Integration (CI): Automatically running tests on every commit.
- Continuous Deployment (CD): Automatically releasing code to production.
- Documentation as a living part of the codebase.

### Practice
- **CI/CD:**
    - Setting up workflows (e.g., GitHub Actions, GitLab CI).
    - Defining build steps: Lint -> Test -> Build -> Deploy.
- **Documentation:**
    - Writing comprehensive READMEs (Installation, Usage, Contribution).
    - Generating API documentation automatically (Sphinx, MkDocs).
    - Keeping documentation in sync with code changes.

---
`;
