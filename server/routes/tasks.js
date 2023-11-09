const router = require("express").Router();
const { User } = require("../models/user");
const { Task, validate } = require("../models/task");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validObjectId = require("../middleware/validObjectId");

// Create task
router.post("/", auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) res.status(400).send({ message: error.details[0].message });

	// const task = await Task(req.body).save();

	const user = await User.findById(req.user._id);
	const task = await Task({ ...req.body, user: user._id }).save();
	user.tasks.push(task._id);
	await user.save();

	res.status(201).send({ data: task, message: "Task created successfully" });
});

// Get user tasks
router.get("/user", auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	const tasks = await Task.find({ _id: user.tasks });
	res.status(200).send({ data: tasks, message: "Tasks successfully retrieved" });
});

// get task by id
router.get("/:id", [validObjectId, auth], async (req, res) => {
	const task = await Task.findById(req.params.id);
	if (!task) return res.status(404).send("not found");
	res.status(200).send({ data: task, message: "Task was found" });
});

// Update task
router.put("/:id", [validObjectId, auth], async (req, res) => {
	const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.send({ data: task, message: "Updated task successfully" });
});

// Delete task by ID
router.delete("/:id", [validObjectId, auth], async (req, res) => {
	await Task.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Task deleted sucessfully" });
});

// complete task
router.put("/complete/:id", [validObjectId, auth], async (req, res) => {
	let resMessage = "";
	const task = await Task.findById(req.params.id);
	if (!task) return res.status(400).send({ message: "task does not exist" });

	const user = await User.findById(req.user._id);
	const index = user.notes.indexOf(task._id);
	if (index === -1) {
		user.completedTasks.push(task._id);
		resMessage = "Added to your completed tasks";
	} else {
		user.completedTasks.splice(index, 1);
		resMessage = "Removed from your completed tasks";
	}

	await user.save();
	res.status(200).send({ message: resMessage });
});

// Get completed tasks
router.get("/complete", auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	const tasks = await Task.find({ _id: user.completedTasks });
	res.status(200).send({ data: tasks });
});

module.exports = router;