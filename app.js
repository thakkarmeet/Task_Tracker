const express = require("express");

module.exports = () => {
    const app = express();

    app.use(express.static("frontend/dist"));
    app.set("view engine", "pug");

    app.get("/", (req, res) => {
        res.render("pages/index", {
            title: "Testing Site",
            content: "This is the test site.",
        });
    });

    app.use("/frontend", require("./routes/frontend"));
    app.use("/fullstack", require("./routes/fullstack"));

    return app;
};
