# Presentation Script

## Opening

"This is my SWE308 Student Management API. I rebuilt it using Node.js, Express, and MySQL."

## What To Show First

Run:

```powershell
Get-Content sql/init.sql | mysql -u root -p
npm start
```

If `mysql` is not recognized, use the MySQL full path shown in `README.md`.

Open:

```text
http://localhost:3000
```

Say:

"This route confirms the API is running."

## Main Demo

Show these in `requests.http` or Postman:

1. `GET /api/students`
   - "This reads all students from MySQL."

2. `POST /api/students`
   - "This creates a new student."

3. `PUT /api/students/:id`
   - "This is a partial update. I can update only the email without sending all fields."

4. `GET /api/students/department/Software%20Engineering`
   - "This searches by department."

5. `POST /api/students/:id/courses`
   - "This uses the second table. The course belongs to a student through a foreign key."

## What To Say About Security

"I used parameterized queries with `?` placeholders. This prevents SQL injection because user input is treated as data, not SQL code."

## What To Say About Errors

"If the input is wrong, the API returns `400`. If a student is missing, it returns `404`. If a duplicate email or student number is sent, it returns `409`."

## Closing

"The project covers CRUD, validation, partial update, department filtering, a second table with a foreign key, and reflection answers."
