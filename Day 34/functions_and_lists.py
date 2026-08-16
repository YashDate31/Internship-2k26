# Day 34: Python Functions & List Operations

def calculate_grades(marks_list):
    """Calculate total, average, and letter grade for a list of marks."""
    total = sum(marks_list)
    avg = total / len(marks_list)
    
    if avg >= 90:
        grade = 'A+'
    elif avg >= 80:
        grade = 'A'
    elif avg >= 70:
        grade = 'B'
    else:
        grade = 'C'
        
    return total, avg, grade

def filter_passing_students(students):
    """Filter students who scored 50 or above."""
    return [s for s in students if s['score'] >= 50]

if __name__ == '__main__':
    student_scores = [92, 85, 78, 95, 88]
    total, avg, grade = calculate_grades(student_scores)
    print(f"Total Marks: {total}")
    print(f"Average Marks: {avg:.2f}")
    print(f"Final Grade: {grade}")
