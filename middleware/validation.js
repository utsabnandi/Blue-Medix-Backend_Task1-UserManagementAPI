// middleware/validation.js
const Joi = require("joi");

const userValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    roles: Joi.object({
      isAdmin: Joi.boolean(),
      isSeller: Joi.boolean(),
      isCustomer: Joi.boolean(),
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = { userValidation };
