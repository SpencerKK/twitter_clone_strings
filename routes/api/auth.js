const express = require("express");
const router = express.Router();
const db = require("../../config/db.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });


// post
// api/auth
// login user || get token is res
// public
router.post("/", (req, res) => {
    const { email, password } = req.body;

    let sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, row) => {
        if (err) {
            console.log(err);
        } else {

            if (row.length === 0) {
                res.json({ msg: "Invalid credentials" })
            } else {
                let payload = {
                    user: {
                        email
                    }
                }
    
                const isMatch = await bcrypt.compare(password, row[0].password);
    
                if (isMatch) {
                    const token = jwt.sign({ payload }, process.env.jwtSecret);
                    res.json(token);
                } else {
                    res.json({ msg: "Invalid Credentials..." })
                }
            }
        }
    })
})

module.exports = router;