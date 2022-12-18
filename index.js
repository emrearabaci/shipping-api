const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv').config();

// Middlewares and Configurations
const corsOption = {
  origin: process.env.CORS_ORIGIN
};

const app = express();
app.use(express.json());
app.use(cors(corsOption));
app.use(helmet());

// Database Connection
(async () => {
  try {
    const mongoose = await require('mongoose');
    await mongoose.set('strictQuery', true);
    await mongoose
      .connect(process.env.DB_CONNECT)
      .then((/* res */) => {
        console.log(
          `Connection Successful! (DB STATUS:${mongoose.connection.readyState})`
        );
      })
      .catch((/* err */) => {
        console.log(
          `Not Connected! (DB STATUS:${mongoose.connection.readyState})`
        );
      });
  } catch (err) {
    console.log(err);
  }
})();

// ON FIRE
app.listen(process.env.PORT, () => {
  console.log(`Server Running!`);
});
