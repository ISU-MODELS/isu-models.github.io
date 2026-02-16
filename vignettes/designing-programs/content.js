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

Example **Explicit Arguments** Function:
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

Example **Positional Arguments** (\`*Args\`) Function:
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

Example **Keyword Arguments** (\`**Kwargs\`) Function:
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

## III. Defining Classes

### Principle: Encapsulation

In Section II, we treated data (lists of scores) and logic (calculating averages) as separate things. You passed data *into* a function.

**Object-Oriented Programming (OOP)** changes this. It allows us to bundle the **Data** (Attributes) and the **Logic** (Methods) into a single container. This is called **Encapsulation**.

**1. The Blueprint (Class)**
Think of a **Class** as a blueprint for a house. The blueprint is not a house; you cannot live in it. It just describes how the house should be built.
* *Syntax:* Defined using \`class Name:\` (Note the PascalCase).

**2. The Object (Instance)**
An **Object** is the actual house built from that blueprint. You can build 1,000 different houses (Objects) from one blueprint (Class). Each house has its own address and its own furniture.

**3. The Setup (\`__init__\`)**
When you build the house, you need to set the initial state (paint color, number of rooms). In Python, the \`__init__\` method runs automatically when you create a new object. It is the "Starter Kit."

**4. The Identity (\`self\`)**
This is the most confusing part for beginners.
* Imagine you have three students. If you say "tell me your name," the program needs to know *which* student you are talking to.
* \`self\` is a reference to the **specific object** being used right now. \`self.name\` means "MY name," not just "A name."

### Practice

\`\`\`python
class Student:
    """A blueprint for a Student object."""

    # The Setup (Constructor)
    def __init__(self, name, starting_grade):
        self.name = name                # Attribute (Data)
        self.scores = []                # Attribute (Empty List)
        self.grade_level = starting_grade

    # The Logic (Method)
    def add_score(self, score):
        """Adds a score to this specific student's record."""
        self.scores.append(score)
        print(f"Added {score} to {self.name}'s record.")

# Creating Objects (Instantiation)
student_1 = Student("Ryan", 12)
student_1.add_score(95)
\`\`\`

### Principle: Inheritance

One of the most powerful features of Classes is **Inheritance**. This allows us to create specialized classes based on generic ones, preventing code duplication.

Think of it like biology:
* A **Tesla** inherits traits from a **Car**.
* A **Car** inherits traits from a **Vehicle**.
* The **Tesla** has everything a Vehicle has, plus everything a Car has, *plus* its own unique features (like AutoPilot).

**The \`super()\` Function**
To make this work, each child class must tell its parent to set itself up first. We do this using \`super().__init__()\`. This passes the data "up the chain."

### Practice

**Level 1: The Generic Base (Vehicle)**
This class handles the basics: who owns it?
\`\`\`python
class Vehicle:
    def __init__(self, owner):
        self.owner = owner  # Identity from Level 1
        print(f"Level 1: Registered Vehicle for {owner}")
\`\`\`

**Level 2: The Specific Category (Car)**
This class adds "Car" features (doors) but remembers it is also a Vehicle.
\`\`\`python
class Car(Vehicle):
    def __init__(self, owner, doors):
        # Pass 'owner' up to Level 1
        super().__init__(owner)
        self.doors = doors  # Identity from Level 2
        print(f"Level 2: Built Car with {doors} doors")
\`\`\`

**Level 3: The Specialized Model (Tesla)**
This class adds "Electric" features (range) but remembers it is also a Car.
\`\`\`python
class Tesla(Car):
    def __init__(self, owner, doors, range_km):
        # Pass 'owner' and 'doors' up to Level 2
        super().__init__(owner, doors)
        self.range_km = range_km  # Identity from Level 3
        print(f"Level 3: Installed Battery with {range_km}km range")

# --- usage ---
# We create a Level 3 object, but it triggers the whole chain.
print("--- Creating My Car ---")
my_car = Tesla(owner="Ryan", doors=4, range_km=500)

print("\n--- Final Object Identities ---")
# The Tesla object has attributes from ALL three levels
print(f"Owner: {my_car.owner}")      # From Level 1
print(f"Doors: {my_car.doors}")      # From Level 2
print(f"Range: {my_car.range_km}")   # From Level 3
\`\`\`

### Principle: Representation

Currently, if you try to print your object with \`print(my_car)\`, Python gives you a cryptic message like \`<__main__.Tesla object at 0x7f...>\`. This is not helpful for debugging.

We can fix this using **Magic Methods** (methods with double underscores). The most useful one is \`__str__\`. It tells Python: "When someone tries to print me, show them *this* string instead."

**Practice: Making Objects Readable**
\`\`\`python
class Tesla(Car):
    def __init__(self, owner, doors, range_km):
        super().__init__(owner, doors)
        self.range_km = range_km

    # The Magic Method for "String Representation"
    def __str__(self):
        return f"[Tesla Model] Owner: {self.owner} | Range: {self.range_km}km"

my_car = Tesla("Ryan", 4, 500)
print(my_car) 
# Output: [Tesla Model] Owner: Ryan | Range: 500km
\`\`\`

---

## IV. Scoping Variables

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

Let's look at an example of **Local** vs. **Global** scope in practice. Each variable scope has its own advantages and disadvantages. In general, global variables enable more links in a program, which is convenient for simple programs. However, as programs grow in size, the number of links can become overwhelming, making it difficult to track the flow of data and debug issues.

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

## V. Standardizing Style

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

## VI. Managing Mutability

### Principle: Pure vs. Impure Functions

A major risk in Python design involves **Mutable Data** (like Lists and Dictionaries). When you pass a list to a function, you are not passing a *copy* of that list; you are passing the *actual* list.

If your function changes the list (e.g., sorts it, appends to it, or deletes items), **it changes the original list outside the function too.** This is called a **Side Effect**.

**1. The Bug (Unintended Mutation)**
\`\`\`python
def bad_process(data):
    # This modifies the ORIGINAL list!
    data.append(999) 
    return sum(data)

my_scores = [10, 20, 30]
print(bad_process(my_scores)) # Returns 1059
print(my_scores)              # [10, 20, 30, 999] <- My original data is corrupted!
\`\`\`

**2. The Fix (Copying)**
If you need to modify data, create a copy first.
\`\`\`python
def good_process(data):
    # Create a local copy first
    local_data = data.copy() 
    local_data.append(999)
    return sum(local_data)

my_scores = [10, 20, 30]
print(good_process(my_scores)) # Returns 1059
print(my_scores)               # [10, 20, 30] <- Safe!
\`\`\`

---

## VII. Handling Errors

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

## Conclusion

By now, you have moved from writing simple, linear scripts to designing robust, modular programs. By wrapping logic in functions, you made your code reusable. By scoping variables correctly, you protected your data from accidental modification. By standardizing your style, you made your work readable and maintainable. And by handling errors gracefully, you ensured your program can survive the unexpected. These are not just rules; they are the tools of a professional developer, and you are well on your way to becoming a great one if you learn to use them well.

### Assignment

Now let's put it all together by writing a function that uses these principles for a real MODELS Lab project. The instructor will provide you with some additional background and task information to get started. Over the remaining time in this training, you will work on this assignment independently and come back as a team for peer review.

If it is your first time coding in an environment like this, do not get embarrassed if you forget a principle or two or three or more! The goal is to learn and improve. We all started somewhere, and we can all learn from each other. Even senior developers can forget principles and may have to look them up or have someone occasionally remind them through collaborative coding.

---
`;
