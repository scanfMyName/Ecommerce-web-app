const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
  confirmPassword: Joi.ref("password"),
  username: Joi.string().required(),
    role: Joi.string().required(),
});

exports.validateSignup = validator(signupSchema);
