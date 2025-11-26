// User model for MongoDB
const mongoose = require('mongoose');

// Schema defines what fields a user has
const UserSchema = new mongoose.Schema({
  name: String,       // User name
  email: String,      // User email
  password: String    // User password (plain for now)
});

// Exporting user model
module.exports = mongoose.model('User', UserSchema);
