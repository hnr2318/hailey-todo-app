const mongoose = require("mongoose");
const Joi = require("joi");

const ObjectId = mongoose.Schema.Types.ObjectId;

const noteSchema = new mongoose.Schema({
	desc: { type: String, required: true },
	date: { type: String, required: true },
	user: { type: ObjectId, ref: "user", required: true },
});

const validate = (note) => {
	const schema = Joi.object({
		desc: Joi.string().required(),
		date: Joi.date().required(),
		user: Joi.string().required(),
	});
	return schema.validate(note);
};

const Note = mongoose.model("note", noteSchema);

module.exports = { Note, validate };