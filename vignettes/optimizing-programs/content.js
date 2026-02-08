
// Wrapper for local file access (bypassing CORS)
window.vignetteContent = `---

# Session 4: Optimizing Programs

**© 2026 Ryan P. McGehee, Ph.D.**

## Introduction

- The trade-off between code readability and performance.
- When to optimize (premature optimization is the root of all evil).
- Tools for measuring performance (benchmarking vs profiling).

---

## Concurrency

### Principle: Parallelism vs Concurrency
- Difference between I/O-bound and CPU-bound tasks.
- The Global Interpreter Lock (GIL) in Python.
- Amdahl's Law (limits of parallelization).

### Practice
- **Process-Based:**
    - Using \`multiprocessing\` for CPU-bound tasks.
    - Managing creating, starting, and joining processes.
    - Inspecting data sharing quirks (pickling).
- **Thread-Based:**
    - Using \`threading\` for I/O-bound tasks.
    - Synchronization (Locks, Semaphores) to prevent race conditions.
    - Using \`concurrent.futures.ThreadPoolExecutor\`.
- **Asynchronous:**
    - The Event Loop concept.
    - Using \`asyncio\`, \`async\`, and \`await\` keywords.
    - Non-blocking I/O operations.

---

## CPU and GPU Concurrency

### Principle: Hardware Acceleration
- Understanding CPU architectures (cores, threads, cache).
- GPU architecture (SIMD - Single Instruction, Multiple Data).
- When to offload to GPU (matrix operations, massive parallelism).

### Practice
- Profiling CPU usage to identify bottlenecks.
- Using libraries like Numba (JIT compilation) for CPU speedups.
- Basic GPU offloading (e.g., using CUDA via libraries like CuPy or PyTorch tensors).

---

## Memory Management

### Principle: Efficiency and Lifecycle
- Stack vs Heap memory.
- Garbage Collection mechanisms.
- Memory leaks and fragmentation.

### Practice
- Using generators (\`yield\`) instead of lists for large datasets.
- Profiling memory usage (e.g., \`memory_profiler\`).
- Manually triggering garbage collection (\`gc.collect\`) when necessary.
- Choosing memory-efficient data structures (e.g., \`slots\` in classes, NumPy arrays).

---
`;
