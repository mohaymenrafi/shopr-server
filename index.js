const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
// use middleware
app.use(express.json());
// const userRoute = require('./routes/user');

// connect mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('db connection successful'))
  .catch((err) => console.log(err.message));

// calling apis
// app.use('/api/user', userRoute);

// creating server
app.listen(PORT, () => {
  console.log('server is running at: ', PORT);
});
