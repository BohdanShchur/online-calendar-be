const RuleError = require('../errors/ruleError');
const { FORBIDDEN } = require('../consts/statusCodes');

const inputDataValidation = (data, validationSchema) => {
    const { error } = validationSchema.validate(data);
    let result = false;
    if (error) {
        result = new RuleError(error.details[0].message, FORBIDDEN);
    }

    return result;
}
module.exports = inputDataValidation;