const Joi = require('joi');
const {  } = require('../consts/regex');
const validator = require('./validator');

const nestedTimeRange = Joi.object({
    start: Joi.date(),
    end: Joi.date(),
})
const inputEventValidator = Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().optional(),
    eventTimeRange: nestedTimeRange.required(),
    notificationTime: Joi.number().min(1).max(60),
});

const validateEvent = (event) => {
    return validator(event, inputEventValidator);
    
  };

module.exports = {validateEvent};