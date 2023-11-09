const router = require("express").Router();
const { List, validate } = require("../models/list");
const { Task } = require("../models/task");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const validObjectId = require("../middleware/validObjectId");
const Joi = require("joi");

// create list
router.post("/", auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const name = await List.findOne({ name: req.body.name, user: req.user._id });
	if (name) {
		return res.status(403).send({ message: "List with same name exists" })
	}
	
	const user = await User.findById(req.user._id);
	const list = await List({ ...req.body, user: user._id }).save();
	user.lists.push(list._id);
	await user.save();

	res.status(201).send({ data: list, message: "Successfully created list" });
});

// edit list by id
router.put("/edit/:id", [validObjectId, auth], async (req, res) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		desc: Joi.string().allow(""),
		img: Joi.string().allow(""),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const list = await List.findById(req.params.id);
	if (!list) return res.status(404).send({ message: "list not found" });

	const user = await User.findById(req.user._id);
	if (!user._id.equals(list.user))
		return res.status(403).send({ message: "User don't have access to edit!" });

	list.name = req.body.name;
	list.desc = req.body.desc;
	list.img = req.body.img;
	await list.save();

	res.status(200).send({ message: "Updated successfully" });
});

// add task to list
router.put("/add-task", auth, async (req, res) => {
	const schema = Joi.object({
		listId: Joi.string().required(),
		taskId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.user._id);
	const list = await List.findById(req.body.listId);
	if (!user._id.equals(list.user))
		return res.status(403).send({ message: "User don't have access to add!" });

	if (list.tasks.indexOf(req.body.taskId) === -1) {
		list.tasks.push(req.body.taskId);
	}
	await list.save();
	res.status(200).send({ data: list, message: "Added to list" });
});

// remove task from list
router.put("/remove-task", auth, async (req, res) => {
	const schema = Joi.object({
		listId: Joi.string().required(),
		taskId: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.user._id);
	const list = await List.findById(req.body.listId);
	if (!user._id.equals(list.user))
		return res
			.status(403)
			.send({ message: "User don't have access to Remove!" });

	const index = list.tasks.indexOf(req.body.taskId);
	list.tasks.splice(index, 1);
	await list.save();
	res.status(200).send({ data: list, message: "Removed from list" });
});

// user lists
router.get("/user", auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	const lists = await List.find({ _id: user.lists });
	res.status(200).send({ data: lists, message: "Lists successfully retrieved" });
});

// get random lists
router.get("/random", auth, async (req, res) => {
	const lists = await List.aggregate([{ $sample: { size: 10 } }]);
	res.status(200).send({ data: lists });
});

// get list by id
router.get("/:id", [validObjectId, auth], async (req, res) => {
	const list = await List.findById(req.params.id);
	if (!list) return res.status(404).send("not found");

	const tasks = await Task.find({ _id: list.tasks });
	res.status(200).send({ data: { list, tasks } });
});

// get all lists
// router.get("/", auth, async (req, res) => {
// 	const lists = await List.find();
// 	res.status(200).send({ data: lists });
// });

// delete list by id
router.delete("/:id", [validObjectId, auth], async (req, res) => {
	const user = await User.findById(req.user._id);
	const list = await List.findById(req.params.id);
	if (!user._id.equals(list.user))
		return res
			.status(403)
			.send({ message: "User don't have access to delete!" });

	const index = user.lists.indexOf(req.params.id);
	user.lists.splice(index, 1);
	await user.save();
	await list.save();
	res.status(200).send({ message: "Removed from library" });
});

module.exports = router;