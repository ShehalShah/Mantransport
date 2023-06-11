const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Message = require('./models/Message');
const Order = require('./models/Order');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const orderRoutes = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://shehalshah264:rBEkpsFTScaF17YF@cluster0.34luzjv.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/orders', orderRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
