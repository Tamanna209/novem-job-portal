const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  social_id: String,
  name: String,
  email: String,
  reg_id: String,
  device_id: String,
  user_type: String,
  location: String,
  app_id: String,
  number: String,
  otp: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
