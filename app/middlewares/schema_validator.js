const { checkSchema, validationResult } = require('express-validator/check');

const errors = require('../errors');

const checkValidationResult = (request, _, next) => {
  const errorsResult = validationResult(request);
  return errorsResult.isEmpty()
    ? next()
    : next(errors.schemaError(errorsResult.array({ onlyFirstError: true }).map(e => e.msg)));
};

exports.validateSchema = schema => checkSchema(schema);

exports.validateSchemaAndFail = schema => [this.validateSchema(schema), checkValidationResult];
