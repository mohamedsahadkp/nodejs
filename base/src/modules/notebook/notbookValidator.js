const { BAD_REQUEST } = require("http-status-codes");
const Joi = require("@hapi/joi");

const { ErrorHandler } = require("../../errorHandlers");
const { createReadableMessageFromJoi } = require("../../helpers");

module.exports = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw new Error(error);
    //throw new ErrorHandler(BAD_REQUEST, createReadableMessageFromJoi(error));
  }

  next();
};
