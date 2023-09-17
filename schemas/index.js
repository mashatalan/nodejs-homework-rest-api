const contactsAddSchema = require('./contacts-schemas');
const userSignupSchema = require('./auth-schema');
const userSigninSchema = require('./auth-schema');
const updateSubscriptionSchema = require('./auth-schema');


module.exports = contactsAddSchema;

module.exports = {
  userSigninSchema,
  updateSubscriptionSchema,
  userSignupSchema,
}