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

// Product Routes
const allProductsRoute = require('./api/product/allProducts');
app.use('/api/product', allProductsRoute);
const newProductRoute = require('./api/product/newProduct');
app.use('/api/product', newProductRoute);
const searchProductRoute = require('./api/product/searchProduct');
app.use('/api/product', searchProductRoute);

// Shipment Routes
const allShipmentsRoute = require('./api/shipment/allShipments');
app.use('/api/shipment', allShipmentsRoute);
const newShipmentRoute = require('./api/shipment/newShipment');
app.use('/api/shipment', newShipmentRoute);
const searchShipmentRoute = require('./api/shipment/searchShipment');
app.use('/api/shipment', searchShipmentRoute);
const updateShipmentRoute = require('./api/shipment/updateShipment');
app.use('/api/shipment', updateShipmentRoute);

// ON FIRE
app.listen(process.env.PORT, () => {
  console.log(`Server Running!`);
});
