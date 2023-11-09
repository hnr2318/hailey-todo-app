const router = require("express").Router();
const { Task } = require("../models/task");
const { List } = require("../models/list");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
    const search = req.query.search;
    if (search !== "") {
        const tasks = await Task.find({
            name: { $regex: search, $options: "i" }
        }).limit(10);
        const lists = await List.find({
            name: { $regex: search, $options: "i" }
        }).limit(10);
        const result = { tasks, lists };
        res.status(200).send({ data: result });
    } else {
        res.status(200).send({});
    }
});

module.exports = router;