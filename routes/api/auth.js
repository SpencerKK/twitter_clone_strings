const express = require("express");
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
                    jwt.sign(
                        payload,
                        process.env.jwtSecret,
                        { expiresIn: 360000 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({ token });
                            
                        }
                    )
                } else {
                    res.json({ msg: "Invalid Credentials..." })
                }
            }
        }
    })
})


// get
// api/auth
// sends token in request, returns user details
// private
router.get("/", authMid, (req, res) => {
    try {
        let emailInToken = req.user;

        let sql = "SELECT name, email FROM users WHERE email = ?";

       db.query(sql, [emailInToken.email], (err, row) => {
           if (err) {
               console.log(err);
           } else {
               res.json(row[0])
           }
       })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})


module.exports = router;
















// router.get("/", authMid, async (req, res) => {
//     try {
//         let userEmail = req.user.email;
//         let sql = "SELECT name, email FROM users WHERE email = ?";

//         db.query(sql, [userEmail], async (err, row) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 if (row.length === 1) {
//                     res.json(row[0])
//                 } else {
//                     res.json({ msg: "Fucked up" })
//                 }
//             }
//         })
//     } catch(err) {
//         console.error(err.message);
//         res.status(500).send("Server Error")
//     }
// })