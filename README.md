# SWE308 Student Management API Rebuild

This is a from-scratch rebuild of the SWE308 Student Management API homework.

The goal is not only to have working code, but to understand what every part does.

## What This Project Is

This is a backend API built with:

- Node.js
- Express
- MySQL
- mysql2
- dotenv

It manages students and their courses.

## How The Project Is Organized

```text
app.js                 Express app setup
config/db.js           MySQL connection pool
routes/studentRoutes.js API route list
controllers/           Request logic and SQL queries
sql/init.sql           Database schema and seed data
tests/                 Automated API behavior tests
requests.http          Manual demo requests
```

## Step-By-Step Mental Model

1. `app.js` starts Express and says where requests should go.
2. `routes/studentRoutes.js` maps URLs to controller functions.
3. `controllers/studentController.js` validates input, runs SQL, and returns JSON.
4. `config/db.js` connects the app to MySQL.
5. `sql/init.sql` creates the database tables.

## Setup

```powershell
npm install
copy .env.example .env
```

Open `.env` and set your real MySQL password.

Create the database and tables:

```powershell
Get-Content sql/init.sql | mysql -u root -p
```

If `mysql` is not recognized in PowerShell, use the full path to MySQL. Common examples:

```powershell
Get-Content sql/init.sql | & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
```

or, if you use XAMPP:

```powershell
Get-Content sql/init.sql | & "C:\xampp\mysql\bin\mysql.exe" -u root -p
```

Start the API:

```powershell
npm start
```

Then open:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/` | Check API is running |
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get one student |
| POST | `/api/students` | Create student |
| PUT | `/api/students/:id` | Partially update student |
| DELETE | `/api/students/:id` | Delete student |
| GET | `/api/students/department/:department` | Search by department |
| POST | `/api/students/:id/courses` | Add course for student |
| GET | `/api/students/:id/courses` | Get student's courses |

## Tests

```powershell
npm test
```

The tests prove the API behavior before a live database demo.

## Important Learning Points

- `express.json()` is needed so Express can read JSON request bodies.
- `?` placeholders in SQL protect against SQL injection.
- `affectedRows` tells us whether update/delete actually found a record.
- Validation should happen before database queries.
- A foreign key connects `courses.student_id` to `students.id`.
