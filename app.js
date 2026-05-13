const express = require("express");
require("dotenv").config({ quiet: true });

const pool = require("./config/db");
const { createStudentRouter } = require("./routes/studentRoutes");

// createApp makes testing easier: real app uses MySQL, tests can pass a mock pool.
function createApp(databasePool = pool) {
  const app = express();

  // This lets Express read JSON bodies from POST and PUT requests.
  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "SWE308 Student Management API is running" });
  });

  app.use("/api/students", createStudentRouter(databasePool));

  app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
  });

  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  });

  return app;
}

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  createApp().listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = { createApp };
