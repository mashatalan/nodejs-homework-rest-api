require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
  createUser,
  getUser,
} = require('../repositories');
const {HttpError} = require('../helpers');


const {JWT_SECRET} = process.env;

const signup = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const existingUser = await getUser(email);
    if (existingUser) {
      return next(HttpError(409, 'Email in use'));
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await createUser({...req.body, password: hashPassword});

    res.status(201).json({
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await getUser(email);

    if (!user) {
      return next(HttpError(401, 'Email or password is wrong'));
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return next(HttpError(401, 'Email or password is wrong'));
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '23h'});
    user.token = token;
    await user.save();

    res.status(201).json({
      token,
      user: {
        email: req.body.email,
        subscription: 'starter',
      },
    });
  } catch (error) {
    next(error);
  }
};

const signout = async (req, res, next) => {
  try {
    const {user} = req;
    user.token = '';
    await user.save();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = (req, res, next) => {
  try {
    const {user: {email, subscription}} = req;
    if (!email) {
      return next(HttpError(401, 'Not authorized'));
    }
    res.status(200).json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
}


module.exports = {
  signup,
  signin,
  signout,
  getCurrentUser,
}