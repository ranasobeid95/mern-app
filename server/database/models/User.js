const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const { genSalt, hash, compare } = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter avalid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter an password'],
    minlength: [8, 'Minimum password length is 8 characters'],
  },
});

userSchema.pre('save', async function (next) {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isAuth = await compare(password, user.password);
    if (isAuth) {
      return user;
    }
    throw Error('incorrect password');
  }

  throw Error('incorrect email');
};

module.exports = model('user', userSchema);
