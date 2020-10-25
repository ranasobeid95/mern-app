const mongoose = require('mongoose');
require('dotenv').config();

let dbURL = '';

if (process.env.NODE_ENV === 'production') {
  dbURL = process.env.DB_CONNECTION;
} else {
  dbURL = process.env.DEV_URI;
}
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = mongoose.connection;
