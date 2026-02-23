import resource
import multiprocessing
import time
import os

def data_consumer(size_mb):
    # Allocate some memory
    data = bytearray(size_mb * 1024 * 1024)
    time.sleep(1)
    return len(data)

if __name__ == '__main__':
    print(f"Parent PID: {os.getpid()}")
    print(f"Initial RUSAGE_CHILDREN: {resource.getrusage(resource.RUSAGE_CHILDREN).ru_maxrss}")

    with multiprocessing.Pool(processes=2) as pool:
        pool.map(data_consumer, [10, 10])
        print(f"Pool working... RUSAGE_CHILDREN: {resource.getrusage(resource.RUSAGE_CHILDREN).ru_maxrss}")
    
    # Pool is closed here by context manager, but we might need join()
    print(f"Pool closed. RUSAGE_CHILDREN: {resource.getrusage(resource.RUSAGE_CHILDREN).ru_maxrss}")
    
    # Force join if needed
    # pool.join() is called by __exit__ of Pool
    
    print(f"Final RUSAGE_CHILDREN: {resource.getrusage(resource.RUSAGE_CHILDREN).ru_maxrss}")
