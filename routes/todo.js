const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/todo", {title: "Todo App"});
});

module.exports = router;
