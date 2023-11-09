const mongoose = require("mongoose");
const Joi = require("joi");

const ObjectId = mongoose.Schema.Types.ObjectId;

const listSchema = new mongoose.Schema({
    name: { type: String, unique: true, require: true },
    user: { type: ObjectId, ref: "user", required: true },
    desc: { type: String },
    tasks: { type: Array, default: [] }
});

const validate = (list) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        user: Joi.string().required(),
        desc: Joi.string().allow(""),
        tasks: Joi.array().items(Joi.string()),
        img: Joi.string().allow("")
    });
    return schema.validate(list);
};

const List = mongoose.model("list", listSchema);

module.exports = { List, validate };