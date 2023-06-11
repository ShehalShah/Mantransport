const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Manufacturer', 'Transporter'], required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
