# Modular version of the student grade reporting script.
#   This solution results in more lines of code, but it is much easier to read, 
#   test, and maintain if the code were to be used in a larger program.

def calculate_average(scores):
    """
    Calculate the average of a list of scores.
    Returns None if the list is empty or contains invalid values.
    """
    if not scores:
        return None
    
    # Optional: basic validation (can be expanded)
    if not all(isinstance(s, (int, float)) and 0 <= s <= 100 for s in scores):
        raise ValueError("All scores must be numbers between 0 and 100")
    
    return sum(scores) / len(scores)


def get_grade_and_message(average):
    """
    Determine letter grade and corresponding message based on average.
    Returns a tuple: (letter_grade: str, message: str)
    
    This centralizes the grading logic so thresholds are defined in only one place.
    """
    if average is None:
        return "N/A", "No scores provided."
    
    if average >= 90:
        return "A", "Great job! Keep up the excellent work!"
    elif average >= 80:
        return "B", "Great job! Keep up the excellent work!"
    elif average >= 70:
        return "C", "You're doing okay — study a bit harder next time."
    elif average >= 60:
        return "D", "Warning: academic probation may be coming. Seek help."
    else:
        return "F", "Warning: academic probation may be coming. Seek help."


def print_grade_report(student_name, scores):
    """
    Main function: prints a complete grade report for one student.
    """
    print("Student Grade Report")
    print("────────────────────")
    print(f"Name: {student_name}")
    print()

    try:
        average = calculate_average(scores)
        
        if average is None:
            print("No scores available.")
            return
            
        average_display = f"{average:.2f}"
        letter_grade, message = get_grade_and_message(average)
        
        print(f"Average: {average_display}")
        print(f"Letter Grade: {letter_grade}")
        print("────────────────────")
        print(message)
        
    except ValueError as e:
        print(f"Error: {e}")
    
    print("────────────────────")


# ────────────────────────────────────────────────
# Example usage (you can call this function multiple times
# with different students)
# ────────────────────────────────────────────────

if __name__ == "__main__":
    # Test data
    student_name = "Maria Gonzalez"
    scores = [88, 91, 76, 84, 92]
    
    print_grade_report(student_name, scores)
    
    # Additional example with different data
    print("\n" + "="*40 + "\n")
    
    student_name = "Alex Kim"
    scores = [72, 68, 81, 65, 74]
    
    print_grade_report(student_name, scores)
    
    # Edge case example
    print("\n" + "="*40 + "\n")
    
    student_name = "Invalid Student"
    scores = []
    
    print_grade_report(student_name, scores)