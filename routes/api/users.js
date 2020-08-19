const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../../config/db.config");
const router = express.Router();

// Post
// api/users
// register users
// public
router.post("/register", (req, res) => {

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    let sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, row) => {
        if (err) {
            console.log(err)
        } else {
            if (row.length > 0) {
                return res.json({ msg: "A user already exists with that email..." })
            }

            let salt = await bcrypt.genSalt(12);

            password = await bcrypt.hash(password, salt);

            let userInsertData = { name, email, password };

            db.query("INSERT INTO users SET ?", userInsertData, (err, rows, fields) => {
                if (err) {
                    console.log(err.message);
                } else {
                    res.json({ theRows: rows })
                }
            })
        }
    })
})

module.exports = router;