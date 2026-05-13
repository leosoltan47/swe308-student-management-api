const STUDENT_FIELDS = [
  "student_no",
  "first_name",
  "last_name",
  "email",
  "department",
];

function isBlank(value) {
  return typeof value !== "string" || value.trim() === "";
}

function validateStudentPayload(payload, requiredFields = STUDENT_FIELDS) {
  const errors = [];

  for (const field of requiredFields) {
    if (isBlank(payload[field])) {
      errors.push(`${field} is required`);
    }
  }

  if (typeof payload.email === "string" && !payload.email.includes("@")) {
    errors.push("email must contain @");
  }

  if ("department" in payload && isBlank(payload.department)) {
    errors.push("department is required");
  }

  return errors;
}

function handleDatabaseError(err, res, next) {
  if (err && err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      error: "Duplicate student number, email, or course code",
    });
  }

  return next(err);
}

function createStudentController(pool) {
  return {
    async getAllStudents(req, res, next) {
      try {
        const [rows] = await pool.execute(
          "SELECT * FROM students ORDER BY id DESC",
        );
        return res.status(200).json(rows);
      } catch (err) {
        return next(err);
      }
    },

    async getStudentById(req, res, next) {
      try {
        const [rows] = await pool.execute(
          "SELECT * FROM students WHERE id = ?",
          [req.params.id],
        );

        if (rows.length === 0) {
          return res.status(404).json({ error: "Student not found" });
        }

        return res.status(200).json(rows[0]);
      } catch (err) {
        return next(err);
      }
    },

    async createStudent(req, res, next) {
      try {
        const errors = validateStudentPayload(req.body);

        if (errors.length > 0) {
          return res.status(400).json({ errors });
        }

        const { student_no, first_name, last_name, email, department } =
          req.body;

        const [result] = await pool.execute(
          `INSERT INTO students
            (student_no, first_name, last_name, email, department)
           VALUES (?, ?, ?, ?, ?)`,
          [
            student_no.trim(),
            first_name.trim(),
            last_name.trim(),
            email.trim(),
            department.trim(),
          ],
        );

        return res.status(201).json({
          message: "Student created successfully",
          id: result.insertId,
        });
      } catch (err) {
        return handleDatabaseError(err, res, next);
      }
    },

    async updateStudent(req, res, next) {
      try {
        const providedFields = STUDENT_FIELDS.filter(
          (field) => field in req.body,
        );

        if (providedFields.length === 0) {
          return res.status(400).json({
            error:
              "Provide at least one field to update: student_no, first_name, last_name, email, department",
          });
        }

        const errors = validateStudentPayload(req.body, providedFields);

        if (errors.length > 0) {
          return res.status(400).json({ errors });
        }

        const setClause = providedFields
          .map((field) => `${field} = ?`)
          .join(", ");
        const values = providedFields.map((field) => req.body[field].trim());
        values.push(req.params.id);

        const [result] = await pool.execute(
          `UPDATE students SET ${setClause} WHERE id = ?`,
          values,
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Student not found" });
        }

        return res.json({ message: "Student updated successfully" });
      } catch (err) {
        return handleDatabaseError(err, res, next);
      }
    },

    async deleteStudent(req, res, next) {
      try {
        const [result] = await pool.execute(
          "DELETE FROM students WHERE id = ?",
          [req.params.id],
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Student not found" });
        }

        return res.json({ message: "Student deleted successfully" });
      } catch (err) {
        return next(err);
      }
    },

    async getStudentsByDepartment(req, res, next) {
      try {
        const department = req.params.department;

        if (isBlank(department)) {
          return res.status(400).json({ error: "department is required" });
        }

        const [rows] = await pool.execute(
          "SELECT * FROM students WHERE department = ? ORDER BY id DESC",
          [department],
        );

        return res.status(200).json(rows);
      } catch (err) {
        return next(err);
      }
    },

    async createCourseForStudent(req, res, next) {
      try {
        const { course_code, course_name } = req.body;
        const errors = [];

        if (isBlank(course_code)) {
          errors.push("course_code is required");
        }

        if (isBlank(course_name)) {
          errors.push("course_name is required");
        }

        if (errors.length > 0) {
          return res.status(400).json({ errors });
        }

        const [result] = await pool.execute(
          "INSERT INTO courses (student_id, course_code, course_name) VALUES (?, ?, ?)",
          [req.params.id, course_code.trim(), course_name.trim()],
        );

        return res.status(201).json({
          message: "Course created successfully",
          id: result.insertId,
        });
      } catch (err) {
        if (err && err.code === "ER_NO_REFERENCED_ROW_2") {
          return res.status(404).json({ error: "Student not found" });
        }

        return handleDatabaseError(err, res, next);
      }
    },

    async getCoursesByStudent(req, res, next) {
      try {
        const [rows] = await pool.execute(
          "SELECT * FROM courses WHERE student_id = ? ORDER BY id DESC",
          [req.params.id],
        );

        return res.status(200).json(rows);
      } catch (err) {
        return next(err);
      }
    },
  };
}

module.exports = { createStudentController };
