# SWE308 Student Management API

Express + MySQL CRUD application for the SWE308 homework due on 06 May 2026.

For a quick explanation of the whole project, read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md).

## Features

- Create, read, update, and delete students.
- Validate that email contains `@`.
- Validate that department is not empty.
- Search students by department.
- Partial student updates with `PUT /api/students/:id`.
- Second table, `courses`, connected to `students` with a foreign key.
- Parameterised MySQL queries to prevent SQL injection.

## Project Structure

```text
swe308-student-management-api/
|-- app.js
|-- .env.example
|-- config/
|   `-- db.js
|-- controllers/
|   `-- studentController.js
|-- routes/
|   `-- studentRoutes.js
|-- sql/
|   `-- init.sql
|-- tests/
|   `-- student-api.test.js
`-- REFLECTION.md
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from the example:

```bash
copy .env.example .env
```

3. Start MySQL with Docker:

```bash
npm run db:up
```

This starts MySQL on port `3307` and automatically runs `sql/init.sql`.

Alternative if you want to use your own local MySQL: create the database and tables manually.

PowerShell:

```bash
Get-Content sql/init.sql | mysql -u root -p
```

Command Prompt / Git Bash:

```bash
mysql -u root -p < sql/init.sql
```

4. If you use your own local MySQL instead of Docker, edit `.env` and set your real MySQL connection:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=swe308_demo
```

5. Start the API:

```bash
npm start
```

The API runs at:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/` | Health check |
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get one student |
| POST | `/api/students` | Create student |
| PUT | `/api/students/:id` | Partially update student |
| DELETE | `/api/students/:id` | Delete student |
| GET | `/api/students/department/:department` | Get students by department |
| GET | `/api/students/:id/courses` | Get courses for one student |
| POST | `/api/students/:id/courses` | Add a course for one student |

## Example Requests

Create a student:

```bash
curl -X POST http://localhost:3000/api/students ^
  -H "Content-Type: application/json" ^
  -d "{\"student_no\":\"2024004\",\"first_name\":\"Ali\",\"last_name\":\"Demir\",\"email\":\"ali@example.com\",\"department\":\"Software Engineering\"}"
```

Partial update:

```bash
curl -X PUT http://localhost:3000/api/students/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"new.email@example.com\"}"
```

Get students by department:

```bash
curl http://localhost:3000/api/students/department/Software%20Engineering
```

Add a course connected to a student:

```bash
curl -X POST http://localhost:3000/api/students/1/courses ^
  -H "Content-Type: application/json" ^
  -d "{\"course_code\":\"SWE308\",\"course_name\":\"Server-Side Programming\"}"
```

## Tests

```bash
npm test
```

The tests cover CRUD behavior, validation, department search, partial update, missing delete handling, and creating a course linked to a student.

## Homework Mapping

| Assignment Requirement | Implemented In |
| --- | --- |
| Express server | `app.js` |
| MySQL connection pool | `config/db.js` |
| Student routes | `routes/studentRoutes.js` |
| CRUD controller logic | `controllers/studentController.js` |
| `students` table | `sql/init.sql` |
| Email and department validation | `controllers/studentController.js` |
| `GET /api/students/department/:department` | `routes/studentRoutes.js` |
| Partial update | `controllers/studentController.js` |
| Second table with foreign key | `courses` table in `sql/init.sql` |
| Reflection answers | `REFLECTION.md` |
