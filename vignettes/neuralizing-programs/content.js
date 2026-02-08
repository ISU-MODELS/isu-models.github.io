
// Wrapper for local file access (bypassing CORS)
window.vignetteContent = `---

# Session 5: Neuralizing Programs

**© 2026 Ryan P. McGehee, Ph.D.**

## Introduction

- Integrating Machine Learning (ML) and Artificial Intelligence (AI) into standard software.
- Shift from deterministic to probabilistic programming.
- Managing the unique lifecycle of ML models.

---

## ML Workflows

### Principle: The Data Pipeline
- Garbage In, Garbage Out (GIGO).
- The transition from raw data to features.
- Reproducibility in data splitting (Train/Val/Test).

### Practice
- **Essentials:**
    - Loading data efficiently (Pandas, Dataloaders).
    - Statistical cleaning and normalization/standardization.
- **Training:**
    - Defining model architectures (Layers, Nodes).
    - The breakdown of a training loop: Forward pass, Loss calculation, Backward pass (Backpropagation), Optimizer step.
    - Checkpointing and saving model state.
- **Hypertuning:**
    - Defining hyperparameter search spaces (Learning rate, Batch size).
    - Grid Search vs Random Search strategies.
    - Using tools like Optuna or Ray Tune.

---

## AI Integration

### Principle: Inference and Deployment
- Model versioning and registry.
- Latency vs Throughput considerations in inference.
- Explainability and bias monitoring.

### Practice
- Deploying models as APIs (REST/gRPC).
- Integrating Large Language Models (LLMs) via APIs or local quantization.
- Creating prompt templates and managing context windows.
- Monitoring model drift in production.

---
`;
