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

const corsOptions = {
    origin: "https://hailey-todo-app-static.onrender.com",
}

connection();
app.use(cors(corsOptions));
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/notes", noteRoutes);
app.use("/lists", listRoutes);
app.use("/", searchRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}`))