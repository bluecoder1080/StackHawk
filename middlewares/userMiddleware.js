const jwt = require("jsonwebtoken");
const jwtuser = process.env.JWT_SECRET_USER;

function userMiddleware(req, res, next) {
  const token = req.headers;
  const decoded = jwt.verify(token, jwtuser);
  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    res.status(403).json({
      messsage: "You Are not signed in ",
    });
  }
}

module.exports = {
  userMiddleware,
};
