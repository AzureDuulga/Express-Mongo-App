const jwt = require("jsonwebtoken");

const checkRole = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400).json({ messase: "Token явуулагүй байна." });
  }
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (user.role !== "Admin") {
    res.status(400).json({ messase: "Энэ үйлдлийг хийх эрх хүрэхгүй байна." });
  }
  next();
};

module.exports = checkRole;
