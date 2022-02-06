require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');

// use middleware
app.use(express.json());
app.use(cors());

// connect mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('db connection successful'))
  .catch((err) => console.log(err.message));

// calling apis
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);

// creating server
app.listen(PORT, () => {
  console.log('server is running at: ', PORT);
});
