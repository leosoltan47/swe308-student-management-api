# Project Summary

This project is a SWE308 Student Management API built with Node.js, Express, and MySQL.

## One-Sentence Summary

I built a backend Student Management API using Express and MySQL, with CRUD operations, validation, department search, partial updates, and a second courses table connected by foreign key.

## What The Project Does

The API manages students in a MySQL database. It can:

- create a student
- list all students
- get one student by ID
- update a student
- delete a student
- search students by department
- add courses connected to a student

## Main Technologies

- Node.js
- Express
- MySQL
- mysql2
- dotenv
- Docker, optional but recommended for the demo database

## Database Tables

### `students`

Stores student information:

- `id`
- `student_no`
- `first_name`
- `last_name`
- `email`
- `department`
- `created_at`

### `courses`

Stores courses linked to students:

- `id`
- `student_id`
- `course_code`
- `course_name`
- `created_at`

`courses.student_id` is a foreign key connected to `students.id`.

## Assignment Requirements Covered

- Express server
- MySQL database connection
- CRUD operations for students
- email validation
- department validation
- department search endpoint
- partial update
- second table with foreign key
- reflection answers
- GitHub repository
- demo instructions
- automated tests

## Important API Endpoints

```text
GET    /
GET    /api/students
GET    /api/students/:id
POST   /api/students
PUT    /api/students/:id
DELETE /api/students/:id
GET    /api/students/department/:department
POST   /api/students/:id/courses
GET    /api/students/:id/courses
```

## What To Say To The Professor

"I built a Student Management API using Node.js, Express, and MySQL. It supports full CRUD operations for students, validates email and department fields, allows searching students by department, supports partial updates, and includes a second courses table connected to students through a foreign key. I also used parameterised queries to prevent SQL injection and proper HTTP status codes for API responses."

## Files To Open First

- `README.md` - setup and endpoint documentation
- `PRESENTATION.md` - demo script and talking points
- `requests.http` - ready-to-run API requests
- `REFLECTION.md` - assignment reflection answers
- `sql/init.sql` - database schema and seed data
