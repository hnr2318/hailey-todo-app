const mongoose = require("mongoose");

module.exports = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).send({ message: `Invalid ID: ${req.params.id}` })
    }
    next();
}