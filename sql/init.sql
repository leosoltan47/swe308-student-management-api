CREATE DATABASE IF NOT EXISTS swe308_demo;
USE swe308_demo;

DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_no VARCHAR(20) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  department VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  course_code VARCHAR(20) NOT NULL,
  course_name VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_courses_students
    FOREIGN KEY (student_id) REFERENCES students(id)
    ON DELETE CASCADE,
  CONSTRAINT unique_student_course UNIQUE (student_id, course_code)
);

INSERT INTO students
  (student_no, first_name, last_name, email, department)
VALUES
  ('2024001', 'Alex', 'Soltan', 'alex@example.com', 'Software Engineering'),
  ('2024002', 'Merve', 'Yildiz', 'merve@example.com', 'Software Engineering'),
  ('2024003', 'Ayse', 'Kaya', 'ayse@example.com', 'Computer Engineering');

INSERT INTO courses
  (student_id, course_code, course_name)
VALUES
  (1, 'SWE308', 'Server-Side Programming'),
  (1, 'SWE304', 'Software Engineering'),
  (2, 'SWE308', 'Server-Side Programming');
