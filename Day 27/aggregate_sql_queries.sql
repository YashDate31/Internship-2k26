-- Day 27: SQL Table Operations & Aggregate Functions
CREATE DATABASE IF NOT EXISTS student_db;
USE student_db;

-- Table structure for students marks
CREATE TABLE IF NOT EXISTS student_marks (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    marks INT NOT NULL
);

-- Insert sample records
INSERT INTO student_marks (name, subject, marks) VALUES
('Yash Date', 'Web Development', 92),
('Aarav Sharma', 'Web Development', 85),
('Rohan Verma', 'Database Systems', 78),
('Priya Patel', 'Database Systems', 95),
('Neha Singh', 'Web Development', 88);

-- Aggregate Function Queries
SELECT COUNT(*) AS total_students FROM student_marks;
SELECT MIN(marks) AS lowest_mark FROM student_marks;
SELECT MAX(marks) AS highest_mark FROM student_marks;
SELECT AVG(marks) AS average_marks FROM student_marks;
SELECT SUM(marks) AS total_combined_marks FROM student_marks;
