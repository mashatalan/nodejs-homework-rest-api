const Joi = require('joi');

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;

const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).required().messages({
      "string.pattern.base": "Password should contain at least 8 characters one letter and one number",
    }),
});

const userSigninSchema = Joi.object().keys({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.valid("starter", "pro", "business"),
});

module.exports = {
  userSignupSchema,
  userSigninSchema,
  updateSubscriptionSchema,
}