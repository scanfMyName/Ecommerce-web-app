const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const cartItemSchema = Joi.object({
  productId: Joi.number().required(),
  username: Joi.string().required(),
  price: Joi.number().required(),
  size: Joi.string().required(),
  color: Joi.string().required(),
  quantity: Joi.number().required(),
});

exports.validateCartItem = validator(cartItemSchema);
