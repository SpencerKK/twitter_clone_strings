const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const db = require("./config/db.config");

// parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connect(err => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("MySQL connected");
    }
})

// routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// starts
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log("Server is running on port: " + PORT);
});
