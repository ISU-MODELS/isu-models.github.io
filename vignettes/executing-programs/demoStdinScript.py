# demoStdinScript.py
import sys

def main():
    print("Reading from Standard Input (stdin)...")
    print("(Press Ctrl+C to exit if you ran this without piping input)")
    
    try:
        # Read standard input line by line
        for line in sys.stdin:
            processed_line = line.strip()
            # If the line is empty, skip it (optional)
            if processed_line:
                print(f"Processed: {processed_line.upper()}") 
    except KeyboardInterrupt:
        print("\nOperation cancelled by user.")

if __name__ == "__main__":
    main()