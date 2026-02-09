
// Wrapper for local file access (bypassing CORS)
window.vignetteContent = `---

# Session 6: Releasing Programs

**© 2026 Ryan P. McGehee, Ph.D.**

## Introduction

- Software entropy: Code rots if not maintained.
- The shift from "writing code" to "managing a product".
- Ensuring longevity, collaboration, and reliability.

---

## I. Testing Logic

### Principle: Verification

- **Unit Tests:** Testing small, isolated units of code.
- **TDD:** Test-Driven Development (writing tests *before* code).
- **Regression Testing:** Ensuring today's fix doesn't break yesterday's feature.

### Practice

**Tools:**
- **Pytest:** The industry standard for Python testing. Simple syntax, powerful fixtures.
- **Coverage:** Measuring what percentage of your code is actually executed during tests.

**Structure:**
Keep tests in a separate \`tests/\` folder, mirroring your source code structure.

---

## II. Documenting Systems

### Principle: Living Documentation

Documentation is not an afterthought; it is a feature. If users (or future you) can't understand how to use it, the code is useless.

### Practice

**Types:**
- **README:** The landing page. Installation, Quick Start, Contribution rules.
- **API Docs:** Auto-generated from docstrings using **Sphinx** or **MkDocs**.
- **Change Log:** Tracking what changed in each version (\`CHANGELOG.md\`).

---

## III. Automating Workflows

### Principle: Continuous Integration/Deployment

- **CI (Continuous Integration):** Automatically running tests and linters on every commit to prevent broken code from entering the main branch.
- **CD (Continuous Deployment):** Automatically building and releasing the package to users (e.g., PyPI) when a version is tagged.

### Practice

**GitHub Actions:**
Define workflows in \`.github/workflows/main.yml\`:
1.  **Checkout** code.
2.  **Install** dependencies.
3.  **Run** tests/linting.
4.  **Publish** artifact (if success).

---

## IV. Reviewing Code

### Principle: Peer Review Dynamics

Code review is about quality assurance and knowledge sharing, not criticism. It ensures that no single person is the sole owner of knowledge ("Bus Factor").

### Practice

**Pull Requests (PRs):**
- Never push directly to \`main\`. Create a branch, make changes, and open a PR.
- **Reviewers:** Check for logic errors, style consistency, and security issues.
- **Authors:** Respond constructively to feedback. "LGTM" (Looks Good To Me) is the seal of approval.

---
`;