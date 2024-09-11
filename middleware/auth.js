//TOKEN VERIFICATION
const jwt = require("jsonwebtoken");

//ye function(middleware) hame un authorisez users se bachayega
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(verified);
    next();
  } catch (e) {
    console.log("error", e);
    // 401 ->unauthorized access
    return res.status(401).send("Unauthorised access");
  }
};
module.exports = auth;
