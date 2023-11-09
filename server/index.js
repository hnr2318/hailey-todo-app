require("dotenv").config();
require("express-async-errors")
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const noteRoutes = require("./routes/notes");
const listRoutes = require("./routes/lists");
const searchRoutes = require("./routes/search")
const app = express();

connection();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/", searchRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}`))