import os
import time
import urllib.request
import math
import tempfile
import argparse
import threading
import multiprocessing
import asyncio
import subprocess
import json
import sys
import resource
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

# -------------------------
# Core Tasks
# -------------------------

def cpu_bound_task(n):
    """
    Simulates a CPU-bound task by finding all prime numbers up to n.
    """
    count = 0
    for i in range(2, n):
        is_prime = True
        for j in range(2, int(math.sqrt(i)) + 1):
            if i % j == 0:
                is_prime = False
                break
        if is_prime:
            count += 1
    return count

def io_bound_task(data, repeats):
    """
    Simulates an I/O-bound task by repeatedly writing and reading data to/from a temporary file.
    """
    fd, path = tempfile.mkstemp()
    try:
        with os.fdopen(fd, 'w') as f:
            for _ in range(repeats):
                f.write(data)
        with open(path, 'r') as f:
            _ = f.read()
    finally:
        os.remove(path)

def web_task(url, repeats):
    """
    Simulates a network I/O-bound task by making synchronous HTTP GET requests.
    """
    total_len = 0
    for _ in range(repeats):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=10) as response:
                html = response.read()
                total_len += len(html)
        except Exception:
            pass
    return total_len

def cpu_bound_task_wrapper(config):
    return cpu_bound_task(config[0])

def io_bound_task_wrapper(config):
    return io_bound_task(config[1], config[2])

def web_task_wrapper(config):
    return web_task(config[3], config[4])

def combined_task(config):
    cpu_res = cpu_bound_task(config[0])
    io_bound_task(config[1], config[2])
    web_res = web_task(config[3], config[4])
    return cpu_res, web_res

# -------------------------
# Concurrency Model Implementations
# -------------------------

def run_serial(task_func, num_tasks, config):
    results = []
    for _ in range(num_tasks):
        results.append(task_func(config))
    return results

def run_threading(task_func, num_tasks, config, workers):
    threads = []
    results = [None] * num_tasks
    sem = threading.Semaphore(workers)
    
    def worker(i, conf):
        with sem:
            results[i] = task_func(conf)
            
    for i in range(num_tasks):
        t = threading.Thread(target=worker, args=(i, config))
        threads.append(t)
        t.start()
        
    for t in threads:
        t.join()
    return results

def run_multiprocessing(task_func, num_tasks, config, workers):
    with multiprocessing.Pool(processes=workers) as pool:
        results = pool.map(task_func, [config] * num_tasks)
    return results

async def async_web_task(url_host, url_path, repeats):
    total_len = 0
    for _ in range(repeats):
        try:
            reader, writer = await asyncio.open_connection(url_host, 80)
            request = f"GET {url_path} HTTP/1.1\r\nHost: {url_host}\r\nConnection: close\r\n\r\n"
            writer.write(request.encode('utf-8'))
            await writer.drain()
            data = await reader.read()
            writer.close()
            await writer.wait_closed()
            total_len += len(data)
        except Exception:
            pass
    return total_len

async def async_combined_task(config):
    url_host = config[3].split("://")[1].split("/")[0]
    loop = asyncio.get_running_loop()
    cpu_res = await loop.run_in_executor(None, cpu_bound_task_wrapper, config)
    await loop.run_in_executor(None, io_bound_task_wrapper, config)
    web_res = await async_web_task(url_host, "/", config[4])
    return cpu_res, web_res

async def _run_asyncio(task_type, num_tasks, config, workers):
    sem = asyncio.Semaphore(workers)
    
    async def worker(conf):
        async with sem:
            if task_type == 'cpu':
                loop = asyncio.get_running_loop()
                return await loop.run_in_executor(None, cpu_bound_task_wrapper, conf)
            elif task_type == 'io':
                loop = asyncio.get_running_loop()
                return await loop.run_in_executor(None, io_bound_task_wrapper, conf)
            elif task_type == 'web':
                url_host = conf[3].split("://")[1].split("/")[0]
                return await async_web_task(url_host, "/", conf[4])
            else:
                return await async_combined_task(conf)
            
    tasks = [asyncio.create_task(worker(config)) for _ in range(num_tasks)]
    return await asyncio.gather(*tasks)

def run_asyncio(task_func, num_tasks, config, workers):
    task_mapping = {
        cpu_bound_task_wrapper: 'cpu',
        io_bound_task_wrapper: 'io',
        web_task_wrapper: 'web',
        combined_task: 'combined'
    }
    task_type = task_mapping.get(task_func, 'combined')
    return asyncio.run(_run_asyncio(task_type, num_tasks, config, workers))

def run_threadpool(task_func, num_tasks, config, workers):
    with ThreadPoolExecutor(max_workers=workers) as executor:
        results = list(executor.map(task_func, [config] * num_tasks))
    return results

def run_processpool(task_func, num_tasks, config, workers):
    with ProcessPoolExecutor(max_workers=workers) as executor:
        results = list(executor.map(task_func, [config] * num_tasks))
    return results

# -------------------------
# Profiling & Formatting
# -------------------------

def print_summary_table(model_name, results):
    print(f"\n--- {model_name} ---")
    print(f"{'Job Type':<15} | {'Time (Seconds)':<15} | {'Memory (MB)':<15}")
    print("-" * 50)
    for job_name, data in results.items():
        time_taken = f"{data['time']:.4f}"
        memory_used = f"{data['memory']:.4f}"
        print(f"{job_name:<15} | {time_taken:<15} | {memory_used:<15}")
    print()

def main():
    parser = argparse.ArgumentParser(description="Concurrency Model Profiler")
    parser.add_argument("--tasks", type=int, default=10)
    parser.add_argument("--workers", type=int, default=4)
    parser.add_argument("--cpu-complexity", type=int, default=50000)
    parser.add_argument("--io-complexity", type=int, default=500)
    parser.add_argument("--web-complexity", type=int, default=5)
    
    # Internal flag for subprocess isolation
    parser.add_argument("--internal-run", choices=["Serial", "Threading", "Multiprocessing", "Asyncio", "ThreadPool", "ProcessPool"])
    parser.add_argument("--job-type", choices=["CPU", "I/O", "Web", "Combined"])
    
    args = parser.parse_args()

    task_config = (args.cpu_complexity, "0123456789" * 1000, args.io_complexity, "http://example.com", args.web_complexity)
    
    tasks_to_run = {
        "CPU": cpu_bound_task_wrapper,
        "I/O": io_bound_task_wrapper,
        "Web": web_task_wrapper,
        "Combined": combined_task
    }

    if args.internal_run:
        # Isolated run for a specific model and job
        task_func = tasks_to_run[args.job_type]
        
        # Determine runner
        if args.internal_run == "Serial":
            runner = lambda f, n, c: run_serial(f, n, c)
        elif args.internal_run == "Threading":
            runner = lambda f, n, c: run_threading(f, n, c, args.workers)
        elif args.internal_run == "Multiprocessing":
            runner = lambda f, n, c: run_multiprocessing(f, n, c, args.workers)
        elif args.internal_run == "Asyncio":
            runner = lambda f, n, c: run_asyncio(f, n, c, args.workers)
        elif args.internal_run == "ThreadPool":
            runner = lambda f, n, c: run_threadpool(f, n, c, args.workers)
        elif args.internal_run == "ProcessPool":
            runner = lambda f, n, c: run_processpool(f, n, c, args.workers)

        start_time = time.time()
        runner(task_func, args.tasks, task_config)
        end_time = time.time()
        
        # Get peak memory of self AND children
        usage_self = resource.getrusage(resource.RUSAGE_SELF)
        usage_child = resource.getrusage(resource.RUSAGE_CHILDREN)
        
        # On macOS, maxrss is in bytes. On Linux, it's often in KB.
        # However, for children, ru_maxrss is usually the peak across any child.
        # To be safe and show "cumulative" footprint, we sum them.
        peak_mem_bytes = usage_self.ru_maxrss + usage_child.ru_maxrss
        
        result = {
            "time": end_time - start_time,
            "memory": peak_mem_bytes / 10**6
        }
        print(f"RESULT:{json.dumps(result)}")
        return

    # Orcherstrator Mode
    print(f"Starting concurrency profiling test with isolated subprocesses.")
    print(f"Configuration: {args.tasks} total tasks, {args.workers} concurrent workers limit.")
    print(f"CPU Complexity: {args.cpu_complexity}, I/O Complexity: {args.io_complexity}, Web Complexity: {args.web_complexity}\n")
    
    models = ["Serial", "Threading", "Multiprocessing", "Asyncio", "ThreadPool", "ProcessPool"]

    for model_name in models:
        model_results = {}
        for job_name in tasks_to_run.keys():
            # Build command to run self in a subprocess
            cmd = [
                sys.executable, __file__,
                "--tasks", str(args.tasks),
                "--workers", str(args.workers),
                "--cpu-complexity", str(args.cpu_complexity),
                "--io-complexity", str(args.io_complexity),
                "--web-complexity", str(args.web_complexity),
                "--internal-run", model_name,
                "--job-type", job_name
            ]
            
            try:
                output = subprocess.check_output(cmd).decode('utf-8')
                # Parse the result from the output
                for line in output.split('\n'):
                    if line.startswith("RESULT:"):
                        model_results[job_name] = json.loads(line[7:])
                        break
            except subprocess.CalledProcessError as e:
                print(f"Error running {model_name} {job_name}: {e}")
        
        print_summary_table(model_name, model_results)

if __name__ == "__main__":
    main()
