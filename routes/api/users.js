const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../config/db.config");
const router = express.Router();

// Post
// api/users
// register users
// public
router.post("/register", [
    check("name", "Please inlcude your name").not().isEmpty(),
    check("email", "Please include a valid email address").isEmail(),
    check("password", "Please include a password with at least 6 characters").isLength({ min: 6 })
], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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
                    console.log("User Created")
                }
            })

            let payload = {
                user: {
                    email
                }
            }

            jwt.sign(
                payload,
                process.env.jwtSecret,
                { expiresIn: "360000" },
                (err, token) => {
                    if (err) {
                        console.log(err.message)
                    } else {
                        res.json({ token })
                    }
                }
            )
        }
    })
})

module.exports = router;