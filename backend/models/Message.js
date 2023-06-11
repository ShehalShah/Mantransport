const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  to: { type: String },
  from: { type: String },
  quantity: { type: Number },
  address: { type: String },
  transporter: { type: String },
  manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  price: { type: String },
});

module.exports = mongoose.model('Message', messageSchema);
