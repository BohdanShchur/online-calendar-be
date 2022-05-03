const Joi = require('joi');
const { userNameRegExp, passwordRegExp } = require('../consts/regex');
const validator = require('./validator');

const createUserValidator = Joi.object({
  firstName: Joi.string().trim().regex(userNameRegExp).required(),
  lastName: Joi.string().trim().regex(userNameRegExp).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().regex(passwordRegExp).required(),
  confirmed: Joi.bool(),
});

const loginUserValidator = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().trim().regex(passwordRegExp).required(),
  rememberMe: Joi.bool(),
});

const validateUser = (user) => {
  return validator(user, createUserValidator);
  
};
const validateLogin = (user) => {
  return validator(user, loginUserValidator);
}

module.exports = {
  validateUser,
  validateLogin
}