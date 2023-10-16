const { contactsAddSchema } = require('./contacts-schemas');
const {
  userSignupSchema,
  userSigninSchema,
  updateSubscriptionSchema
} = require('./auth-schema');

module.exports = {
  contactsAddSchema,
  userSigninSchema,
  updateSubscriptionSchema,
  userSignupSchema,
};
