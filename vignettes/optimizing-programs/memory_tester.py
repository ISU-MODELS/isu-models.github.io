import tracemalloc
import time

# For memory_profiler compatibility
import builtins
if 'profile' not in builtins.__dict__:
    profile = lambda f: f

@profile
def create_large_list(n):
    """Creates a very large list of integers."""
    large_list = [i for i in range(n)]
    return large_list

@profile
def create_large_string(n):
    """Creates a very large string."""
    large_string = "A" * n
    return large_string

@profile
def main():
    print("Starting memory intensive process...")
    
    # 1. Start tracemalloc
    tracemalloc.start()
    
    # Run heavy operations
    list_mem = create_large_list(5_000_000)
    str_mem = create_large_string(50_000_000)
    
    # 2. Capture memory snapshot
    current, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    
    print(f"Process complete!")
    print(f"Current Memory Usage: {current / 10**6:.2f} MB")
    print(f"Peak Memory Usage: {peak / 10**6:.2f} MB")

if __name__ == "__main__":
    main()
