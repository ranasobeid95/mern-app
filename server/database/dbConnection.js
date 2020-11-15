const mongoose = require('mongoose');
require('dotenv').config();

let dbURL = '';

if (process.env.NODE_ENV === 'production') {
  dbURL = process.env.DB_CONNECTION;
} else if (process.env.NODE_ENV === 'test') {
  dbURL = process.env.TEST_URL;
} else {
  dbURL = process.env.DEV_URI;
}
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = mongoose.connection;
