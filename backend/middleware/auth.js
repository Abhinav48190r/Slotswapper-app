require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET in middleware: ", JWT_SECRET);

function authMiddleware(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader)
    return res.status(401).json({ error: "Access denied, no token provided" });

  const token = authHeader.replace("Bearer ", "");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
}

module.exports = authMiddleware;
