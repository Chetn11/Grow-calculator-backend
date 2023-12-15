const jwt = require("jsonwebtoken");


const authentication = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.json({ status: "Login First" });
  }
  const token = authToken.split(" ")[1];
  jwt.verify(token, "key", function (err, decoded) {
    if (err) {
      return res.json({ status: "Login First" });
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
};

module.exports = { authentication };
