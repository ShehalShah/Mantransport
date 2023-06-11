const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  to: { type: String, required: true },
  from: { type: String, required: true },
  quantity: { type: Number, required: true },
  address: { type: String, required: true },
  transporter: { type: String, required: true },
});

module.exports = mongoose.model('Message', messageSchema);
