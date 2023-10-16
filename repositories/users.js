const {User} = require('../models');

const createUser = async (props) => {
  try {
    return await User.create(props);
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const getUser = async (email) => {
  try {
    return await User.findOne({email});
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const getUserById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

module.exports = {
  createUser,
  getUser,
  getUserById,
};
