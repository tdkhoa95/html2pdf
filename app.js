const express = require("express");
const cors = require("cors");

const router = require("./routes/baseRoute");
const port = 3000;
const app = express();

// Allow Cross-Origin requests.
app.use(cors());

// Deserialize/Serialize JSON requests.
app.use(express.json());

// Routes.
app.use("/api/v1", router);

app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});

module.exports = app;
