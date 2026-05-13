# Project Summary

This project is a Student Management API for SWE308.

## Short Explanation

I built a backend API using Node.js, Express, and MySQL. It supports CRUD operations for students, validates input, searches students by department, supports partial updates, and includes a second `courses` table connected to students by a foreign key.

## What It Can Do

- Create students
- List students
- Get one student
- Update only the fields provided
- Delete students
- Search by department
- Add courses for students
- List courses for a student

## Database Tables

`students` stores:

- student number
- first name
- last name
- email
- department

`courses` stores:

- course code
- course name
- the student it belongs to

## Main Technical Points

- Express handles the HTTP routes.
- MySQL stores the data.
- `mysql2/promise` lets the code use `async` and `await`.
- Parameterized queries use `?` placeholders for security.
- The project uses local MySQL; import `sql/init.sql` before starting the API.
