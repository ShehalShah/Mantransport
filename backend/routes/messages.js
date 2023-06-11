const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  try {
    const { orderId, to, from, quantity, address, transporter, manufacturerId } = req.body;

    const message = new Message({
      orderId,
      to,
      from,
      quantity,
      address,
      transporter,
      manufacturer: manufacturerId,
    });

    await message.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

router.post('/price', async (req, res) => {
  try {
    const { orderId, price } = req.body;

    const message = new Message({
      orderId,
      price
    });

    await message.save();

    res.status(201).json({ message: 'reply Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

router.post('/transporter', async (req, res) => {
  try {
    const transporter = req.body.transporter;
    const messages = await Message.find({ transporter });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

router.post('/manufacturer', async (req, res) => {
  try {
    const manufacturer = new mongoose.Types.ObjectId(req.body.manufacturer);
    const messages = await Message.find({ manufacturer });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

router.post('/order', async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const messages = await Message.find({ orderId, price: { $ne: null } });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});


module.exports = router;
