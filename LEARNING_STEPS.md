# Learning Steps

Use this file when you want to explain the project to yourself from zero.

## Step 1: Server

`app.js` creates the Express app.

Important lines:

- `express()` creates the API.
- `app.use(express.json())` reads JSON bodies.
- `app.get("/")` creates the test route.
- `app.use("/api/students", ...)` sends student requests to the student router.

## Step 2: Database

`config/db.js` creates a MySQL connection pool.

A pool is useful because the API can reuse connections instead of reconnecting every request.

## Step 3: Tables

`sql/init.sql` creates:

- `students`
- `courses`

`courses.student_id` connects to `students.id`.

## Step 4: Routes

`routes/studentRoutes.js` is the URL list.

Example:

```js
router.get("/", controller.getAllStudents);
```

This means:

```text
GET /api/students
```

will run:

```text
getAllStudents
```

## Step 5: Controller

`controllers/studentController.js` does the real work:

- reads request data
- validates it
- runs SQL
- sends JSON response

## Step 6: Validation

Bad data is rejected before SQL runs.

Examples:

- email without `@`
- empty department
- empty course code

## Step 7: Partial Update

The update route checks which fields were actually sent.

If only `email` is sent, only `email` is updated.

## Step 8: Testing

`tests/student-api.test.js` uses a mock database pool.

This means tests can check API behavior without needing MySQL running.
