import time

# To allow running normally without kernprof
import builtins
if 'profile' not in builtins.__dict__:
    profile = lambda f: f

@profile
def calculate_squares(n):
    """An intentionally slow way to calculate squares."""
    result = []
    for i in range(n):
        result.append(i * i)
    return result

@profile
def string_concatenation(n):
    """An intentionally slow way to concatenate strings."""
    result = ""
    for i in range(n):
        result += str(i)
    return result

@profile
def main():
    print("Starting process...")
    # These operations will take some time
    start = time.time()
    
    squares = calculate_squares(2_000_000)
    strings = string_concatenation(20_000)
    
    end = time.time()
    print(f"Process complete in {end - start:.4f} seconds!")

if __name__ == "__main__":
    main()
