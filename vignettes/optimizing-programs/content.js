
// Wrapper for local file access (bypassing CORS)
window.vignetteContent = `---

# Session 4: Optimizing Programs

**© 2026 Ryan P. McGehee, Ph.D.**

## I. Measuring Performance

### Principle: Benchmarking & Profiling

Optimization must be evidence-based. "Premature optimization is the root of all evil" (Knuth). Before rewriting code, you must measure where time is actually being spent.

- **Benchmarking:** Measuring how long a specific task takes (Stopwatch).
- **Profiling:** analyzing which functions consume the most CPU time (X-Ray).

### Practice

**Tools:**
- **Time:** Use \`time.time()\` for simple checks.
- **cProfile:** Built-in Python profiler: \`python -m cProfile script.py\`.
- **Line Profiler:** For line-by-line analysis.

---

## II. Parallelizing Execution

### Principle: Concurrency vs. Parallelism

- **Concurrency (Threading):** Dealing with multiple things at once (waiting for I/O). Best for network requests.
- **Parallelism (Multiprocessing):** Doing multiple things at once (using multiple CPU cores). Best for heavy calculations.
- **Amdahl's Law:** The theoretical speedup of a task is limited by its serial part.

### Practice

**Process-Based (CPU-Bound):**
Using \`multiprocessing\` to bypass the Global Interpreter Lock (GIL) and use multiple cores.
\`\`\`python
from multiprocessing import Pool
# ... map function to list of data
\`\`\`

**Thread-Based (I/O-Bound):**
Using \`threading\` or \`concurrent.futures\` for downloading files or querying APIs.

**Asynchronous:**
Using \`asyncio\` for non-blocking operations.

---

## III. Accelerating Hardware

### Principle: CPU vs. GPU

- **CPU:** Few powerful cores. Good for sequential logic.
- **GPU:** Thousands of weaker cores. Good for massive parallel operations (SIMD - Single Instruction, Multiple Data).

### Practice

**CPU Speedups:**
- Use **Vectorization** (NumPy) instead of loops.
- Use **Numba** (JIT compilation) to compile Python to machine code.

**GPU Offloading:**
- Use **CuPy** (NumPy on GPU).
- Use **PyTorch/TensorFlow** tensors for matrix multiplication.

---

## IV. Managing Memory

### Principle: Efficiency & Lifecycle

- **Stack vs Heap:** Where variables live.
- **Garbage Collection:** How Python frees memory.
- **Fragmentation:** When free memory is broken into small blocks.

### Practice

**Generators:**
Use generators (\`yield\`) instead of lists to stream data processing one item at a time, saving RAM.

**Data Structures:**
- Use \`slots\` in classes to reduce memory footprint.
- Use NumPy arrays instead of Python lists for numerical data.

**Manual Control:**
Use \`gc.collect()\` to force garbage collection in memory-critical loops.

---
`;
