const router = require("express").Router();
const { User } = require("../models/user");
const { Note, validate } = require("../models/note");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validObjectId = require("../middleware/validObjectId");

// Create note
router.post("/", auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) res.status(400).send({ message: error.details[0].message });

	const user = await User.findById(req.user._id);
	const note = await Note({ ...req.body, user: user._id }).save();
	user.notes.push(note._id);
	await user.save();

	res.status(201).send({ data: note, message: "Note created successfully" });
});

// Get user notes
router.get("/user", auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	const notes = await Note.find({ _id: user.notes });
	res.status(200).send({ data: notes, message: "Notes successfully retrieved" });
});

// get note by id
router.get("/:id", [validObjectId, auth], async (req, res) => {
	const note = await Note.findById(req.params.id);
	if (!note) return res.status(404).send("not found");
	res.status(200).send({ data: note, message: "Note was found" });
});

// Update note
router.put("/:id", [validObjectId, auth], async (req, res) => {
	const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.send({ data: note, message: "Updated note successfully" });
});

// Delete note by ID
router.delete("/:id", [validObjectId, auth], async (req, res) => {
	await Note.findByIdAndDelete(req.params.id);
	res.status(200).send({ message: "Note deleted sucessfully" });
});

module.exports = router;