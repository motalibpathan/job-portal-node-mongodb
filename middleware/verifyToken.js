const jwt = require("jsonwebtoken");
const { promisify } = require("util");
module.exports = async function (req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")?.[1];
    if (!token) {
      return res
        .status(403)
        .json({ status: "failed", error: "You are not logged in" });
    }
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(300).json({ status: "failed", error: "Invalid token" });
  }
};
