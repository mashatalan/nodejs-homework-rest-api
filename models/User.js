const {model, Schema} = require('mongoose');

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
}, {versionKey: false, timestamps: true});

module.exports = model('user', userSchema);