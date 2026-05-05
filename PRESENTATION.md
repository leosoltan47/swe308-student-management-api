# Presentation Guide

Use this file tomorrow to explain and demonstrate the project.

## 1. What This Project Is

This is a Student Management API built for SWE308 using:

- Node.js
- Express
- MySQL
- mysql2
- dotenv

The API stores students in a MySQL database and supports CRUD operations.

## 2. How To Start It

```powershell
npm install
copy .env.example .env
npm run db:up
npm start
```

This uses Docker MySQL on port `3307`, so you do not need to depend on the local MySQL password.

## 3. What To Show

Start with:

```text
GET http://localhost:3000/
```

Then test these endpoints in Postman, Thunder Client, or curl:

```text
GET    /api/students
GET    /api/students/1
POST   /api/students
PUT    /api/students/1
DELETE /api/students/1
GET    /api/students/department/Software%20Engineering
POST   /api/students/1/courses
GET    /api/students/1/courses
```

## 4. Example POST Body

```json
{
  "student_no": "2024004",
  "first_name": "Ali",
  "last_name": "Demir",
  "email": "ali@example.com",
  "department": "Software Engineering"
}
```

## 5. Example Partial Update

```json
{
  "email": "ali.new@example.com"
}
```

Explain that only the provided field is updated.

## 6. Example Validation Error

Send this:

```json
{
  "student_no": "2024005",
  "first_name": "Bad",
  "last_name": "Email",
  "email": "bad-email",
  "department": ""
}
```

Expected result:

```text
400 Bad Request
```

Explain:

- email must contain `@`
- department cannot be empty

## 7. Second Table

The second table is `courses`.

It is connected to `students` using:

```sql
FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
```

This means every course belongs to a student.

## 8. Main Points To Say

- I used parameterised queries with `?` placeholders to prevent SQL injection.
- I used correct HTTP status codes like `201`, `400`, `404`, and `409`.
- I check `affectedRows` after update/delete to know if the student exists.
- I added validation before database operations.
- I added a second table connected with a foreign key.
- I added automated tests for the main API behavior.
