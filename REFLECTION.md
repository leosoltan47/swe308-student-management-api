# SWE308 Reflection Questions

## 1. Why is SQL injection dangerous, and how do parameterised queries prevent it?

SQL injection is dangerous because an attacker can send input that becomes part of the SQL command. That can expose data, modify records, delete tables, or bypass checks.

This project uses parameterised queries with `?` placeholders. The SQL structure stays fixed, and user input is sent separately as data. Because the database driver treats the values as values, input such as `'; DROP TABLE students; --` cannot become executable SQL.

## 2. Why should we check if a record exists before updating or deleting it?

Checking the result of update and delete operations tells the API whether anything actually changed. If `affectedRows` is `0`, the student ID did not exist, so the API returns `404 Not Found`.

Without this check, the API might return a success message even though no student was updated or deleted.

## 3. Why is returning the correct HTTP status code important for client applications?

Client applications use status codes to decide what happened and what to do next. For example:

- `201 Created` means a new student was created.
- `400 Bad Request` means the submitted data is invalid.
- `404 Not Found` means the requested record does not exist.
- `409 Conflict` means a duplicate value broke a unique database rule.
- `500 Internal Server Error` means an unexpected server problem happened.

Correct status codes make the API predictable and easier to debug.
