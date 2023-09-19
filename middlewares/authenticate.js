require('dotenv').config();
const jwt = require('jsonwebtoken');
const {getUserById} = require('../repositories');
const {HttpError} = require('../helpers');


const {JWT_SECRET} = process.env;

const authenticate = async (req, res, next) => {
  const {authorization = ''} = req.headers;

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(401, 'Not authorized'));
  }
  try {
    const {id} = jwt.verify(token, JWT_SECRET);
    const user = await getUserById(id);
    if (!user) {
      return next(HttpError(401, 'Not authorized'));
    }
    req.user = user;
    next();
  } catch (e) {
    return next(HttpError(401, 'Not authorized'));
  }
};

module.exports = authenticate;
