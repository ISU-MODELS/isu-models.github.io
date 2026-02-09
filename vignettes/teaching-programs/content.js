
// Wrapper for local file access (bypassing CORS)
window.vignetteContent = `---

# Session 5: Teaching Programs

**© 2026 Ryan P. McGehee, Ph.D.**

## I. Curating Data

### Principle: The Pipeline

Start with "Garbage In, Garbage Out" (GIGO). Models are only as good as the data they learn from.
- **Cleaning:** Handling missing values and outliers.
- **Features:** Transforming raw data into numerical inputs.
- **Splitting:** Dividing data into Train, Validation, and Test sets to prevent overfitting.

### Practice

**Loading & Processing:**
- Use **Pandas** for tabular manipulation.
- Use **Dataloaders** (PyTorch/TensorFlow) to stream data from disk avoiding RAM overflows.
- **Normalization:** Scaling inputs to a 0-1 or -1 to 1 range implies stability.

---

## II. Architecting Students

### Principle: Layers & Nodes

We do not "program" a neural network; we "architect" it. We define the structure (the student's brain) that will learn from the data.
- **Layers:** Stacks of mathematical operations.
- **Nodes (Neurons):** Individual processing units within layers.

### Practice

**Defining a Model:**
\`\`\`python
import torch.nn as nn
class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.layer1 = nn.Linear(10, 50)  # Input -> Hidden
        self.layer2 = nn.Linear(50, 1)   # Hidden -> Output
\`\`\`

---

## III. Training Models

### Principle: The Learning Loop

Training is an iterative process of guessing and correcting.
1.  **Forward Pass:** The model makes a prediction.
2.  **Loss Calculation:** We measure how wrong the prediction was.
3.  **Backward Pass:** We calculate gradients (direction of error).
4.  **Optimizer Step:** We update the weights to reduce error next time.

### Practice

**The Loop:**
\`\`\`python
# ... inside training loop
prediction = model(data)
loss = criterion(prediction, target)
loss.backward()
optimizer.step()
optimizer.zero_grad()
\`\`\`

---

## IV. Grading Performance

### Principle: Validation & Metrics

How do we know if the student is actually learning or just memorizing the textbook?
- **Validation Set:** Data the model sees but never trains on. Used to tune hyperparameters.
- **Metrics:** Accuracy, Precision, Recall, F1-Score (depending on the problem).

### Practice

**Evaluation:**
- Run the model in \`eval()\` mode.
- Disable gradient calculation (\`torch.no_grad()\`) for speed.
- Compare predictions vs ground truth.

---

## V. Deploying Inference

### Principle: Serving Predictions

A trained model is useless in a notebook. It must be deployed to "serve" predictions to users or other systems.
- **Latency:** How fast can it predict?
- **Throughput:** How many predictions per second?

### Practice

**Deployment Strategies:**
- **Rest API:** Wrap the model in FastAPI/Flask to serve it over HTTP.
- **ONNX:** Export the model to a universal format for faster inference on different hardware.
- **Quantization:** Reducing precision (e.g., float32 to int8) to make the model smaller and faster.

---
`;

