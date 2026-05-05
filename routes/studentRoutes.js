const express = require("express");
const { createStudentController } = require("../controllers/studentController");

function createStudentRouter(pool) {
  const router = express.Router();
  const controller = createStudentController(pool);

  router.get("/", controller.getAllStudents);
  router.get("/department/:department", controller.getStudentsByDepartment);
  router.get("/:id/courses", controller.getCoursesByStudent);
  router.post("/:id/courses", controller.createCourseForStudent);
  router.get("/:id", controller.getStudentById);
  router.post("/", controller.createStudent);
  router.put("/:id", controller.updateStudent);
  router.delete("/:id", controller.deleteStudent);

  return router;
}

module.exports = { createStudentRouter };
