const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authMid = require("../../middleware/authMid");
const db = require("../../config/db.config");


// post
// api/post
// create post
// private
// @ts-ignore
router.post(
  "/",
  [
    authMid,
    [
      check("post_text", "A post must have between 1 & 280 characters")
        .trim()
        .isLength({ min: 1, max: 280 }),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user_id = req.user.id;
    let post_text = req.body.post_text;

    try {
      let sql = "INSERT INTO posts ( user_id, post_text ) ?";

      await new Promise((resolve, reject) => {
        db.query(sql, [user_id, post_text], (err, row) => {
          if (err) {
            return reject(err);
          } else {
            resolve(row);
            res.json({ msg: "This was a success" });
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;