const HttpStatus = require("http-status-codes");
const { Logger } = require("../loaders/logger");

function success(
  req,
  res,
  statusCode = HttpStatus.OK,
  data = null,
  message = ""
) {
  return res
    .status(statusCode)
    .send({
      message,
      data
    })
    .end();
}

function failure(req, res, statusCode = HttpStatus.BAD_REQUEST, message = "") {
  return res
    .status(statusCode)
    .send({ error: message })
    .end();
}

module.exports = {
  success,
  failure
};
