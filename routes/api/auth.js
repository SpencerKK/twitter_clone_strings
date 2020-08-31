const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../../config/db.config");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const authMid = require("../../middleware/authMid");


// post
// api/auth
// login user || get token is res
// public
router.post("/", [
    check("email", "Please include an email to login").isEmail(),
    check("password", "Please include a valid email address").not().isEmpty()
], (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    let sql = "SELECT * FROM users WHERE email = ?";
    let user_id;

    db.query(sql, [email], async (err, row) => {
        if (err) {
            console.log(err);
        } else {

            if (row.length === 0) {
                return res.status(400).json({ errors: [{ msg: 'User does not exist' }] });
            } else {

                user_id = row[0].id

                let payload = {
                    user: {
                        user_id
                    }
                };

                const isMatch = await bcrypt.compare(password, row[0].password);

                if (isMatch) {
                    jwt.sign(
                        payload,
                        process.env.jwtSecret,
                        { expiresIn: 360000 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({ token });

                        }
                    );
                } else {
                    return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
                }
            }
        }
    });
});


// get
// api/auth
// sends token in request, returns user details
// private
router.get("/", authMid, (req, res) => {
    try {
        // @ts-ignore
        let userId = req.user.user_id;

        let sql = "SELECT name, email, id FROM users WHERE id = ?";

        db.query(sql, [userId], (err, row) => {
            if (err) {
                console.log(err);
            } else {
                res.json(row[0]);
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;
















