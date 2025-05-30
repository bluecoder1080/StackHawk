const jwt = require("jsonwebtoken");
const jwtadmin = process.env.JWT_SECRET_ADMIN;

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, jwtadmin);
  if (decoded) {
    req.adminId = decoded.id;
    next();
  } else {
    res.status(403).json({
      messsage: "You Are not signed in ",
    });
  }
}

module.exports = {
  adminMiddleware,
};
