const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  user: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

module.exports = model('user', userSchema);
