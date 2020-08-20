const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "No token. Authorization denied..." })
    }

    try {
        const decoded = jwt.verify(token, process.env.jwtSecret);

        req.user = decoded.user;

    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" })
    }
}