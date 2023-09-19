const express = require('express');
const {userSignupSchema, userSigninSchema} = require('../../schemas');
const {validateBody, authenticate} = require('../../middlewares');
const {signup, signin, signout, getCurrentUser} = require('../../controllers');


const authRouter = express.Router();


// маршруты для регистации
authRouter.post('/register', validateBody(userSignupSchema), signup);
authRouter.post('/login', validateBody(userSigninSchema), signin);
authRouter.post('/logout', authenticate, signout);
authRouter.get('/current', authenticate, getCurrentUser);

module.exports = authRouter;