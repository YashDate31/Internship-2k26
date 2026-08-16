-- Day 29: SQL Relational Joins Practice
USE student_db;

-- INNER JOIN: Fetch student names along with their department names
SELECT s.student_id, s.full_name, s.email, d.dept_name
FROM students_enrolled s
INNER JOIN departments d ON s.dept_id = d.dept_id;

-- LEFT JOIN: Fetch all students including those without assigned department
SELECT s.full_name, d.dept_name
FROM students_enrolled s
LEFT JOIN departments d ON s.dept_id = d.dept_id;

-- RIGHT JOIN: Fetch all departments including those without students
SELECT s.full_name, d.dept_name
FROM students_enrolled s
RIGHT JOIN departments d ON s.dept_id = d.dept_id;
