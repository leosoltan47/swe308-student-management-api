# AI Handoff Notes

This repository is for Alexei Soltan's SWE308 homework due on 06 May 2026.

## Assignment Context

The required assignment is the `SWE308-HW.pdf` project:

- Build a code project, not a PowerPoint.
- Project type: Node.js + Express + MySQL backend API.
- Main topic: Express + MySQL CRUD Application from scratch.
- Required domain: Student Management API.

Do not confuse this with the later Week 6 safe/unsafe transactions practical. That practical is lecture/lab material; this repo is for the May 6 Student Management API homework.

## What Must Be Ready

On the presentation PC, make sure these are installed:

- Git
- Node.js 20+ or 22+
- Docker Desktop, recommended for easy MySQL setup
- VS Code or another code editor
- Postman, Thunder Client, or VS Code REST Client

The repo is public:

```text
https://github.com/leosoltan47/swe308-student-management-api
```

## Fresh PC Setup

Use these commands on a new Windows PC:

```powershell
git clone https://github.com/leosoltan47/swe308-student-management-api.git
cd swe308-student-management-api
npm install
copy .env.example .env
npm run db:up
npm start
```

Then test:

```text
http://localhost:3000
```

Expected response:

```json
{
  "message": "SWE308 Student Management API is running"
}
```

## If Docker Is Not Available

Use a local MySQL server instead:

```powershell
Get-Content sql/init.sql | mysql -u root -p
```

Then edit `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=swe308_demo
```

## Implemented Requirements

- Express server in `app.js`
- MySQL connection pool in `config/db.js`
- Student routes in `routes/studentRoutes.js`
- Controller logic in `controllers/studentController.js`
- Database setup in `sql/init.sql`
- CRUD endpoints for students
- Email validation: email must contain `@`
- Department validation: department cannot be empty
- Department search endpoint
- Partial update with `PUT /api/students/:id`
- Second table: `courses`
- Foreign key: `courses.student_id` references `students.id`
- Reflection answers in `REFLECTION.md`
- Demo guide in `PRESENTATION.md`
- API request examples in `requests.http`
- Automated tests in `tests/student-api.test.js`

## Demo Endpoints

Use these in Postman, Thunder Client, or `requests.http`:

```text
GET    /
GET    /api/students
GET    /api/students/1
POST   /api/students
PUT    /api/students/1
DELETE /api/students/1
GET    /api/students/department/Software%20Engineering
POST   /api/students/1/courses
GET    /api/students/1/courses
```

Example student body:

```json
{
  "student_no": "2024004",
  "first_name": "Ali",
  "last_name": "Demir",
  "email": "ali@example.com",
  "department": "Software Engineering"
}
```

Example partial update:

```json
{
  "email": "ali.new@example.com"
}
```

Example course body:

```json
{
  "course_code": "SWE308",
  "course_name": "Server-Side Programming"
}
```

## Verification Commands

Run:

```powershell
npm test
```

Expected result:

```text
7 tests pass
```

For a live database demo:

```powershell
npm run db:up
npm start
```

Then open:

```text
http://localhost:3000/api/students
```

Expected seed data:

- 3 students
- 3 courses

## Presentation Talking Points

Alex can explain:

- "I built a Student Management API using Node.js, Express, and MySQL."
- "The API supports create, read, update, and delete operations."
- "I used parameterised queries with `?` placeholders to prevent SQL injection."
- "I validate email and department before inserting or updating data."
- "I check `affectedRows` after update/delete to know if a student exists."
- "I added a second table, `courses`, connected to `students` using a foreign key."
- "I return proper HTTP status codes such as 201, 400, 404, 409, and 500."

## Important Files For Another AI

- Start with `README.md`.
- Use `PRESENTATION.md` for what Alex should say tomorrow.
- Use `requests.http` for demo requests.
- Use `REFLECTION.md` for written answers.
- Use `sql/init.sql` to understand the database schema.
- Use `tests/student-api.test.js` to understand expected behavior.
