const jwt = require("jsonwebtoken");
const {} = require("http-status-codes");

const { jwtSecretKey } = require("../config");

module.exports = (req, res, next) => {
  const token = req.headers.authorization || null;
  if (!token) {
    throw new Error(req.t("Missing Authorization Header"));
  }

  try {
    jwt.verify(token, jwtSecretKey);
    const jwtData = jwt.decode(token, {
      complete: true,
    });
    req.authUser = jwtData.payload;

    //TODO: jwtData.payload.isPasswordChanged with database value

    next();
  } catch (error) {
    throw new Error(req.t("Unauthorized"));
  }
};
