const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/fullstack", {title: "Fullstack"});
});

module.exports = router;
