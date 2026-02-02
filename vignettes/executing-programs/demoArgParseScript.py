# demoArgParseScript.py
import argparse

def main():
    # Create the parser
    parser = argparse.ArgumentParser(description="A script demonstrating robust argument parsing.")
    
    # Add arguments
    parser.add_argument("-v", "--version", action="version", version="Greeting Script 1.0")
    parser.add_argument("-n", "--name", type=str, help="The name of the person to greet", default="World")
    
    # Parse the arguments
    args = parser.parse_args()
    
    # Use the arguments
    print(f"Hello, {args.name}!")

if __name__ == "__main__":
    main()