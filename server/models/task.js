const mongoose = require("mongoose");
const Joi = require("joi");

const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = new mongoose.Schema({
	name: { type: String, required: true },
	user: { type: ObjectId, ref: "user", required: true },
	desc: { type: String },
	priority: { type: Number },
	dueDate: { type: String },
	status: { type: Number, default: 0 },
});

const validate = (task) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		user: Joi.string().required(),
		desc: Joi.string().allow(""),
		priority: Joi.number().allow(""),
		dueDate: Joi.string().allow(""),
		status: Joi.number(),
	});
	return schema.validate(task);
};

const Task = mongoose.model("task", taskSchema);

module.exports = { Task, validate };