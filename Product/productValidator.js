const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });


const productCreateSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  postedBy: Joi.string().required(),
  size: Joi.array().valid(...[]).required(),
  colour: Joi.array().valid(...[]).required(),
  stock: Joi.number().required(),
  image: Joi.array().valid(...[]).required(),
});

exports.validateCreation = validator(productCreateSchema);


// const Joi = require("joi");

// const validator = (schema) => (payload) =>
//   schema.validate(payload, { abortEarly: false });

// const signupSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().min(3).max(10).required(),
//   confirmPassword: Joi.ref("password"),
//   address: {
//     state: Joi.string().length(2).required(),
//   },
//   DOB: Joi.date().greater(new Date("2012-01-01")).required(),
//   referred: Joi.boolean().required(),
//   referralDetails: Joi.string().when("referred", {
//     is: true,
//     then: Joi.string().required().min(3).max(50),
//     otherwise: Joi.string().optional(),
//   }),
//   hobbies: Joi.array().items([Joi.string(), Joi.number()]),
//   acceptTos: Joi.boolean().truthy("Yes").valid(true).required(),
// });

// exports.validateSignup = validator(signupSchema);
