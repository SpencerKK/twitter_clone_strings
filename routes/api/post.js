const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const authMid = require("../../middleware/authMid");
const db = require("../../config/db.config");

// post
// api/post
// create post
// private
router.post(
  "/",
  authMid,
  [
    check("post_text", "Please include text when making a post")
      .not()
      .isEmpty(),
    check(
      "post_text",
      "A post must not be longer than 280 characters"
    ).isLength({ max: 280 }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user_id = req.user.user_id;
    let post_text = req.body.post_text;
    let newPostData = { user_id, post_text };

    let successMsg;

    db.query("INSERT INTO posts SET ?", newPostData, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        successMsg = "Post Successfully Made";
        res.json({ msg: successMsg });
      }
    });
  }
);

module.exports = router;
