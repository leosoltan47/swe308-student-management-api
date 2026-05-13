# How To Run This Project

Use this file when you need to start the project and explain each step.

## 1. Open The Project Folder

```powershell
cd "C:\Users\alex\Documents\New project\swe308-student-management-api-rebuild"
```

Note: this command moves the terminal into the project folder.

## 2. Install Packages

```powershell
npm install
```

Note: this installs Express, MySQL driver, dotenv, and test packages from `package.json`.

## 3. Create Environment File

```powershell
copy .env.example .env
```

Note: `.env` stores your local database settings.

Open `.env` and change this:

```env
DB_PASSWORD=your_mysql_password
```

Put your real MySQL password there.

## 4. Create The MySQL Database

Try this first:

```powershell
Get-Content sql/init.sql | mysql -u root -p
```

Note: this sends `sql/init.sql` into MySQL. It creates the database, tables, and sample data.

If PowerShell says `mysql` is not recognized, use the full MySQL path:

```powershell
Get-Content sql/init.sql | & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
```

If you use XAMPP:

```powershell
Get-Content sql/init.sql | & "C:\xampp\mysql\bin\mysql.exe" -u root -p
```

## 5. Start The API

```powershell
npm start
```

Note: this runs `node app.js`.

Expected terminal message:

```text
Server running on port 3000
```

## 6. Open In Browser

```text
http://localhost:3000
```

Expected response:

```json
{
  "message": "SWE308 Student Management API is running"
}
```

## 7. Test Students Endpoint

```text
http://localhost:3000/api/students
```

Expected result: a JSON list of students from MySQL.

## 8. Run Automated Tests

Open another terminal in the same folder and run:

```powershell
npm test
```

Note: these tests check the API behavior using a fake database, so they can pass even if MySQL is not running.

## Quick Explanation For Professor

"I run `npm start` to start the Express API. The API connects to MySQL using the settings in `.env`. The database tables are created from `sql/init.sql`. Then I can test endpoints like `/api/students` in the browser or Postman."
