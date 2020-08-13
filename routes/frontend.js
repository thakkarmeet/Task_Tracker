const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/frontend", {title: "Frontend"});
});

module.exports = router;
