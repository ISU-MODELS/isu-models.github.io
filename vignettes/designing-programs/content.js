// Wrapper for local file access (bypassing CORS)
window.vignetteContent = `---

# Session 2: Designing Programs

**© 2026 Ryan P. McGehee, Ph.D.**

## I. Modularizing Logic

### Principle: Linearity vs. Modularity

When you first start coding, you likely write "linear scripts"—a list of instructions read by the computer from top to bottom. This works for simple tasks. However, as your ideas grow, linear scripts become difficult to read, impossible to test, and cumbersome to modify. If you need to calculate an average in five different places, copying and pasting that code five times means you have five places to make a mistake...five different places to maintain. So, let's make it easy to maintain our programs by reducing the number of places where we have to maintain the code. 

**Modularity** solves this by breaking a large, complex problem into small, manageable, and reusable pieces. We call these pieces **Functions**.

### Example

**A Linear Script (Hard to Maintain):**
\`\`\`python
# Calculates average for student A
score_a1 = 85
score_a2 = 90
avg_a = (score_a1 + score_a2) / 2
print(avg_a)

# Calculates average for student B (Duplicate logic)
score_b1 = 78
score_b2 = 82
avg_b = (score_b1 + score_b2) / 2
print(avg_b)
\`\`\`

**A Modular Function (Reusable):**
\`\`\`python
def calculate_average(score1, score2):
    return (score1 + score2) / 2

# Reusing the logic
print(calculate_average(85, 90))
print(calculate_average(78, 82))
\`\`\`

### Practice

Take the following linear script and refactor it into a modular function. **Hint:** There are two places in this script that can be modularized. Can you find both?
\`\`\`
# A simple student grade reporting script that is linear and non-modular.

student_name = "Maria Gonzalez"
scores = [88, 91, 76, 84, 92]

print("Student Grade Report")
print("────────────────────")
print("Name:", student_name)

# Calculate sum the long / repetitive way
total = 0
total = total + scores[0]
total = total + scores[1]
total = total + scores[2]
total = total + scores[3]
total = total + scores[4]

average = total / len(scores)

# Format average with exactly two decimal places
average_display = f"{average:.2f}"

# Determine letter grade (long if-else chain)
letter_grade = None
if average >= 90:
    letter_grade = "A"
elif average >= 80:
    letter_grade = "B"
elif average >= 70:
    letter_grade = "C"
elif average >= 60:
    letter_grade = "D"
else:
    letter_grade = "F"

print("Average:", average_display)
print("Letter Grade:", letter_grade)
print("────────────────────")

# Print a performance message (repeats similar conditions)
if letter_grade == "A" or letter_grade == "B":
    print("Great job! Keep up the excellent work!")
elif letter_grade == "C":
    print("You're doing okay — study a bit harder next time.")
else:
    print("Warning: academic probation may be coming. Seek help.")
\`\`\`

---

## II. Defining Functions

### Principle: Functional Programming

Think of a function as a machine or a "Black Box." You don't always need to know exactly how the gears turn inside; you just need to know what to put in and what you will get out. That is the essence of functional programming.

**1. The Blueprint (Definition)**
In Python, we define a function using the \`def\` keyword. A robust function usually follows this structure:

**2. The Inputs (Parameters)**
Data enters the "Black Box" through parameters.
*   **Explicit Arguments:** Named inputs like \`values\`.
*   **Default Arguments:** Arguments that are optional. Example: \`verbose=False\`. Can be omitted by the user.
*   **Arbitrary Arguments:** are used to pass a variable number of arguments to a function.
    *   *Positional Arguments* (\`*args\`) do this by index or 'position' for lists of arguments
    *   *Keyword Arguments* (\`**kwargs\`) do this by name or 'keyword' for dictionary-like arguments

**3. The Outputs (Return vs. Print)**
This is the most critical distinction for new programmers.
*   **Printing** is for the human. It displays text on the screen. The program cannot "use" printed text.
*   **Returning** is for the computer. It sends data back to the place where the function was called to be stored in a variable.
*   *Tip:* Always use \`return\` to specify output for every function even if it is not intended to return a value. Use \`None\` as the return value for functions like this.

**4. The Contract (Type Hinting)**
To ensure accuracy, we can tell the user what the machine expects. This is called Type Hinting.
Example: \`def function_name(p1: int) -> float:\`
This tells the programmer: "Input an integer, and I will output a float."

### Examples

**Example Explicit Arguments Function:**
\`\`\`python
def calculate_force(mass, acceleration):
    """
    Calculates force (F = m * a).
    Arguments are explicit: we know exactly what is required.
    """
    return mass * acceleration

# Clear and readable
print(calculate_force(10, 9.8))
\`\`\`

**Example Positional Arguments (*Args) Function:**
\`\`\`python
def calculate_batch_average(*args):
    """
    Calculates the average of any number of scores.
    *args allows the function to accept a variable number of inputs.
    """
    if len(args) == 0:
        return 0
    
    total = sum(args)
    return total / len(args)

# Flexible usage
print(calculate_batch_average(85, 90, 88))
print(calculate_batch_average(100, 95, 98, 92, 89))
\`\`\`

**Example Keyword Arguments (**Kwargs) Function:**
\`\`\`python
def create_sensor_log(**kwargs):
    """
    Creates a log entry for a sensor reading.
    **kwargs allows us to attach various metadata tags.
    """
    print("Log Entry:")
    for key, value in kwargs.items():
        print(f"  - {key}: {value}")

# Flexible tagging
create_sensor_log(sensor_id=101, temp=23.5, loc="Lab_A")
create_sensor_log(sensor_id=102, status="Offline", error_code=500)
\`\`\`

---

## III. Scoping Variables

### Principle: Local vs. Global

Where a variable is born determines where it can live. This concept is called **Scope**.

**1. Local Scope (The Default)**
Variables created inside a function are **Local**.
*   **Encapsulation:** They are invisible to the rest of the program. This prevents accidental overwrites.
*   **Memory:** Local variables are destroyed when the function finishes, freeing up memory.
*   *Best Practice:* Use local variables for loop counters and temporary calculations.

**2. Global Scope (The Exception)**
Variables created outside of any function are **Global**. They can be accessed by any part of the program.
*   **Use Cases:** Configuration settings (e.g., \`DATABASE_URL\`), constants (e.g., \`PI = 3.14\`).
*   **The Danger:** Global variables cause "Side Effects." Debugging becomes a nightmare if many functions modify the same global state.
*   *In Python:* To modify a global variable inside a function, use \`global variable_name\`.

### Practice

Let's look at an example of **Local** vs. **Global** scope.

**Local Variable Example**
\`\`\`python
def calculate_area(radius):
    pi = 3.14159  # Local variable: Exists only here
    return pi * (radius ** 2)

print(calculate_area(5))
# print(pi)  # Error! 'pi' is not defined outside the function.
\`\`\`

**Global Variable Example**
\`\`\`python
server_status = "ONLINE"  # Global variable

def crash_server():
    global server_status
    server_status = "OFFLINE"  # Global side effect!

crash_server()
print(server_status)  # "OFFLINE". The change persisted.
\`\`\`

---

## IV. Standardizing Style

### Principle: Readability

Code is read much more often than it is written. Therefore, style is not just aesthetic; it is functional.

**1. Naming Conventions**
The name must be descriptive enough to explain the data, but short enough to type.
*   **Snake Case (\`snake_case\`):** The Python Standard (PEP 8). Used for variable and function names.
*   **Camel Case (\`camelCase\`):** Common in JavaScript/Java.
*   **Pascal Case (\`PascalCase\`):** Used for Class names in Python.
*   **Screaming Snake (\`SCREAMING_SNAKE\`):** Used for Constants.

**2. Documentation**
Every function should have a **Docstring** immediately after the definition explaining what it does, inputs, and outputs.

**3. Modularity Rules**
*   **The 50-Line Rule:** If a function is longer than 50 lines, it is likely doing too much. Break it up.
*   **Single Responsibility:** A function should do one thing. Don't combine calculation, saving, and printing in one function.

**4. Linting (Spell Check for Code)**
Just as you use a spell checker for essays, you use a **Linter** for code. Tools like \`flake8\` or \`pylint\` automatically scan your code to catch style violations and potential errors before you even run it.

### Practice

Let's look at a 'bad' readability vs. 'good' readability example. Test your self. Which one of these functions can you understand more quickly? What if the function was 50 lines long or more?

**Bad Readability**
\`\`\`python
def c(x,y):
    return x * y * 0.5 # What does this do?
\`\`\`

**Good Readability**
\`\`\`python
def calculate_triangle_area(base: float, height: float) -> float:
    """
    Calculates the area of a triangle.

    Args:
        base (float): The base of the triangle.
        height (float): The height of the triangle.

    Returns:
        float: The calculated area.
    """
    return base * height * 0.5
\`\`\`

---

## V. Handling Errors

### Principle: Failing Early

A well-designed program anticipates failure. We use **Exceptions** to handle errors gracefully rather than letting the program crash.

*   **Fail Early:** Check your inputs immediately. If a function requires a number but receives text, raise an error at the very top.
*   **Specific Exceptions:** Do not just say "Error occurred." Raise specific errors like \`ValueError\` or \`TypeError\`.

### Practice

Let's look at some examples of handling errors. We will use a function that processes a list of numbers and divides 100 by each number. The list contains a 0 which will cause an error.

**1. The Slow Crash (Fails Late, No Handling)**
This function runs for 8 seconds before crashing, wasting time and resources.
\`\`\`python
import time

data =[10, 2, 5, 4, 0] # 0 is the error

def process_data_v1(data):
print("Starting Process V1...")
for num in data:
    time.sleep(2) # Pretend this is hard work
result = 100 / num # Crashes here when num is 0
print(f"Processed: {result}")
        
# process_data_v1(data) # Uncomment to see the crash
\`\`\`

**2. The Slow Fail (Fails Late, Graceful Handling)**
This prevents the crash, but still wastes 8 seconds before finding the error.
\`\`\`python
def process_data_v2(data):
print("Starting Process V2...")
try:
for num in data:
    time.sleep(2)
result = 100 / num
print(f"Processed: {result}")
    except ZeroDivisionError:
print("Error: Invalid data found! Stopping safely.")

process_data_v2(data)
\`\`\`

**3. The Efficient Fail (Fails Early, Graceful Handling)**
Check for errors *before* starting the work. Fails instantly, saving time.
\`\`\`python
def process_data_v3(data):
print("Starting Process V3...")
    
    # FAIL EARLY: Check data integrity immediately
if 0 in data:
        raise ValueError("Data contains invalid 0. Aborting.")

for num in data:
    time.sleep(2)
result = 100 / num
print(f"Processed: {result}")

try:
process_data_v3(data)
except ValueError as e:
print(f"Caught error immediately: {e}")
\`\`\`

---

## Example: Putting it all together

\`\`\`python
# GLOBAL CONSTANT (Screaming Snake Case)
DEFAULT_TAX_RATE = 0.05

def calculate_total(price: float, tax_rate: float = DEFAULT_TAX_RATE) -> float:
"""
    Calculates total price including tax.

    Args:
        price (float): The base price of the item.
        tax_rate (float): The tax rate to apply. Defaults to 0.05.

        Returns:
float: The total calculated price.
    """
    # FAIL EARLY: Check for invalid inputs
    if price < 0:
        raise ValueError("Price cannot be negative.")

    # LOCAL VARIABLE (Snake Case)
    # This variable is not visible outside this function
    tax_amount = price * tax_rate

total = price + tax_amount
    
    # OUTPUT
return total

# Demonstration
try:
final_price = calculate_total(100.0)
print(f"Final Price: \${final_price}")

invalid_price = calculate_total(-50.0)
except ValueError as e:
print(f"Transaction failed: {e}")
\`\`\`

---
`;
