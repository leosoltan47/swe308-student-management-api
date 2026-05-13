# Reflection Answers

## 1. Why is SQL injection dangerous, and how do parameterised queries prevent it?

SQL injection is dangerous because an attacker can send input that changes the meaning of the SQL query. This could expose data, modify records, delete tables, or bypass checks.

Parameterized queries prevent this by using `?` placeholders. The SQL command stays fixed, and the user input is passed separately as data.

## 2. Why should we check if a record exists before updating or deleting it?

When update or delete runs, MySQL tells us how many rows were affected. If `affectedRows` is `0`, then no student with that ID existed.

The API should return `404 Not Found` instead of saying the operation succeeded.

## 3. Why is returning the correct HTTP status code important for client applications?

HTTP status codes help the client understand what happened.

- `201` means something was created.
- `400` means the request data is invalid.
- `404` means the record was not found.
- `409` means there is a duplicate value.
- `500` means an unexpected server error happened.

Correct status codes make the API easier to use and debug.
