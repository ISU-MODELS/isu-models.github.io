# demoPrintArgScript.py
import sys

# sys.argv is a list of command line arguments passed to the script.
# sys.argv[0] is always the name of the script itself.

print(f"--- Argument Debugger ---")
print(f"Full argument list (sys.argv): {sys.argv}")
print(f"Script Name (sys.argv[0]): {sys.argv[0]}")

if len(sys.argv) > 1:
    print(f"First Argument (sys.argv[1]): {sys.argv[1]}")
    # Challenge Hint: You could assign this to a variable like 'name' 
    # and print a greeting!
else:
    print("No additional arguments provided.")

print("\nExecution complete.")