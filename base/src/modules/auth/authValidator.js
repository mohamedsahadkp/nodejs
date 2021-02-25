const { BAD_REQUEST } = require("http-status-codes");
const Joi = require("@hapi/joi");

const { ErrorHandler } = require("../../errorHandlers");
const { createReadableMessageFromJoi } = require("../../helpers");

function createAccountValidator(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw new Error(error);
  }

  next();
}

function loginValidator(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw new Error(error);
  }

  next();
}

function forgotPasswordValidator(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw new Error(error);
  }

  next();
}

function resetPasswordValidator(req, res, next) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    resetPasswordCode: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new Error(error);
  }

  next();
}

module.exports = {
  createAccountValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
};
