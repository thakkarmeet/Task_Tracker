// Load settings from your .env file.
require("dotenv").config();

const app = require("./app");
const port = process.env.PORT || 3030;

const application = app();

application.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Application listening at http://localhost:${port}.`);
});
