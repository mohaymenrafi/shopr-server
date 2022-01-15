const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const authRoute = require('./routes/auth');
// use middleware
app.use(express.json());

// connect mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('db connection successful'))
  .catch((err) => console.log(err.message));

// calling apis
app.use('/api/auth', authRoute);

// creating server
app.listen(PORT, () => {
  console.log('server is running at: ', PORT);
});
