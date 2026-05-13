const request = require("supertest");
const assert = require("node:assert/strict");
const { describe, test } = require("node:test");

const { createApp } = require("../app");

function createMockPool(responses = []) {
  const calls = [];

  return {
    calls,
    async execute(sql, params = []) {
      calls.push({ sql: sql.replace(/\s+/g, " ").trim(), params });

      if (responses.length === 0) {
        throw new Error(`Unexpected query: ${sql}`);
      }

      const response = responses.shift();
      if (response instanceof Error) {
        throw response;
      }

      return response;
    },
  };
}

describe("Student Management API rebuild", () => {
  test("health check explains the API is running", async () => {
    const response = await request(createApp(createMockPool())).get("/");

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
      message: "SWE308 Student Management API is running",
    });
  });

  test("returns all students", async () => {
    const pool = createMockPool([
      [
        [
          {
            id: 1,
            student_no: "2024001",
            first_name: "Alex",
            last_name: "Soltan",
            email: "alex@example.com",
            department: "Software Engineering",
          },
        ],
      ],
    ]);

    const response = await request(createApp(pool)).get("/api/students");

    assert.equal(response.status, 200);
    assert.equal(response.body.length, 1);
    assert.equal(pool.calls[0].sql, "SELECT * FROM students ORDER BY id DESC");
  });

  test("returns one student by id", async () => {
    const pool = createMockPool([
      [
        [
          {
            id: 2,
            student_no: "2024002",
            first_name: "Merve",
            last_name: "Yildiz",
            email: "merve@example.com",
            department: "Software Engineering",
          },
        ],
      ],
    ]);

    const response = await request(createApp(pool)).get("/api/students/2");

    assert.equal(response.status, 200);
    assert.equal(response.body.id, 2);
    assert.deepEqual(pool.calls[0].params, ["2"]);
  });

  test("creates a student with valid required fields", async () => {
    const pool = createMockPool([[{ insertId: 12 }]]);

    const response = await request(createApp(pool)).post("/api/students").send({
      student_no: "2024004",
      first_name: "Ali",
      last_name: "Demir",
      email: "ali@example.com",
      department: "Software Engineering",
    });

    assert.equal(response.status, 201);
    assert.deepEqual(response.body, {
      message: "Student created successfully",
      id: 12,
    });
  });

  test("rejects invalid email and empty department before database insert", async () => {
    const pool = createMockPool();

    const response = await request(createApp(pool)).post("/api/students").send({
      student_no: "2024005",
      first_name: "Bad",
      last_name: "Input",
      email: "bad-email",
      department: "",
    });

    assert.equal(response.status, 400);
    assert.ok(response.body.errors.includes("email must contain @"));
    assert.ok(response.body.errors.includes("department is required"));
    assert.equal(pool.calls.length, 0);
  });

  test("partially updates only the fields sent in the request", async () => {
    const pool = createMockPool([[{ affectedRows: 1 }]]);

    const response = await request(createApp(pool)).put("/api/students/7").send({
      email: "new.email@example.com",
    });

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { message: "Student updated successfully" });
    assert.equal(pool.calls[0].sql, "UPDATE students SET email = ? WHERE id = ?");
    assert.deepEqual(pool.calls[0].params, ["new.email@example.com", "7"]);
  });

  test("returns 404 when deleting a missing student", async () => {
    const pool = createMockPool([[{ affectedRows: 0 }]]);

    const response = await request(createApp(pool)).delete("/api/students/404");

    assert.equal(response.status, 404);
    assert.deepEqual(response.body, { error: "Student not found" });
  });

  test("returns students by department", async () => {
    const pool = createMockPool([
      [
        [
          {
            id: 3,
            student_no: "2024003",
            first_name: "Ayse",
            last_name: "Kaya",
            email: "ayse@example.com",
            department: "Computer Engineering",
          },
        ],
      ],
    ]);

    const response = await request(createApp(pool)).get(
      "/api/students/department/Computer%20Engineering",
    );

    assert.equal(response.status, 200);
    assert.equal(response.body[0].department, "Computer Engineering");
    assert.equal(
      pool.calls[0].sql,
      "SELECT * FROM students WHERE department = ? ORDER BY id DESC",
    );
  });

  test("creates a course connected to a student", async () => {
    const pool = createMockPool([[{ insertId: 22 }]]);

    const response = await request(createApp(pool))
      .post("/api/students/5/courses")
      .send({
        course_code: "SWE308",
        course_name: "Server-Side Programming",
      });

    assert.equal(response.status, 201);
    assert.deepEqual(response.body, {
      message: "Course created successfully",
      id: 22,
    });
    assert.equal(
      pool.calls[0].sql,
      "INSERT INTO courses (student_id, course_code, course_name) VALUES (?, ?, ?)",
    );
    assert.deepEqual(pool.calls[0].params, [
      "5",
      "SWE308",
      "Server-Side Programming",
    ]);
  });

  test("returns courses for one student", async () => {
    const pool = createMockPool([
      [
        [
          {
            id: 1,
            student_id: 5,
            course_code: "SWE308",
            course_name: "Server-Side Programming",
          },
        ],
      ],
    ]);

    const response = await request(createApp(pool)).get("/api/students/5/courses");

    assert.equal(response.status, 200);
    assert.equal(response.body[0].course_code, "SWE308");
    assert.equal(
      pool.calls[0].sql,
      "SELECT * FROM courses WHERE student_id = ? ORDER BY id DESC",
    );
  });
});
