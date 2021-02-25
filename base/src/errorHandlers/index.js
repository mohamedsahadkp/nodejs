/* File is copied from wesbos - learn node git hub repo and modified */
const HttpStatus = require("http-status-codes");
const { failure } = require("../helpers/response");
const { LANGUAGE_KEYS } = require("../helpers/constants");

const catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/*
  Not Found Error Handler
  If we hit a route that is not found, we mark it as 404 and pass it along to the next error handler to display
*/
const notFound = (req, res, next) => {
  const message = "request not found";
  const status = HttpStatus.NOT_FOUND;

  return failure(req, res, status || HttpStatus.NOT_FOUND, message);
};

/*
Development Error Handler
In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
*/
const developmentErrors = (err, req, res, next) => {
  console.log(err);
  const { status, message } = err;
  return failure(req, res, status || HttpStatus.INTERNAL_SERVER_ERROR, message);
};

module.exports = {
  developmentErrors,
  catchErrors,
  notFound,
};
