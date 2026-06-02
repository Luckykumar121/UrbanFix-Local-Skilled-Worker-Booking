const joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(5).max(100).required(),
    email: joi.string().email().min(5).max(255).required(),
    contact: joi.string().min(10).max(10).required(),
    password: joi.string().min(4).max(200).required(),
    role: joi
      .string()
      .valid("customer", "worker", "admin")
      .default("customer")
      .required(),
  });
  const { error } = schema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ message: "Bad Request", error: error.details[0].message });
  next();
};

//login validation
const loginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().min(5).max(255).required(),
    password: joi.string().min(4).max(200).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

//wroker profile validation
const workerProfileValidation = (req, res, next) => {
  const schema = joi.object({
    category: joi
      .string()
      .valid(
        "plumber",
        "electrician",
        "carpenter",
        "painter",
        "mechanic",
        "ac_repair",
      )
      .required(),
    experience: joi.number().min(0).required(),
    hourlyRate: joi.number().min(0).required(),

    location: joi.string().min(2).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = { signupValidation, loginValidation, workerProfileValidation };
