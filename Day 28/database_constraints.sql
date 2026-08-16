-- Day 28: SQL Database Constraints (PK, FK, UNIQUE, NOT NULL, CHECK)
USE student_db;

-- Department Table (Primary Key)
CREATE TABLE IF NOT EXISTS departments (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(50) NOT NULL UNIQUE
);

-- Students Table with Foreign Key & Check Constraints
CREATE TABLE IF NOT EXISTS students_enrolled (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    age INT CHECK (age >= 17),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id) ON DELETE SET NULL
);
