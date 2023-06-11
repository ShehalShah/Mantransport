const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { username, password, role, address } = req.body;

    const user = new User({
      username,
      password,
      role,
      address,
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        address: user.address
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
          address: user.address
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to login' });
  }
});

router.get('/transporters', async (req, res) => {
  try {
    const transporters = await User.find({ role: 'Transporter' });
    res.status(200).json(transporters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch transporters' });
  }
});

module.exports = router;
