const router = require('express').Router();

// Product Model
const Product = require('../../model/Product');

router.post('/newProduct', async (req, res) => {
  let {
    productCode,
    productName,
    productCustomer,
    productUnitCost,
    productUnitPrice,
    productUnit,
    productNetMeasure,
    productGrossMeasure,
    productRawMaterial,
    productDescriptions,
    productCreator,
    productUpdater
  } = req.body.newProductForm;

  const newProduct = new Product({
    productCode: productCode,
    productName: productName,
    productCustomer: productCustomer,
    productUnitCost: productUnitCost,
    productUnitPrice: productUnitPrice,
    productUnit: productUnit,
    productNetMeasure: productNetMeasure,
    productGrossMeasure: productGrossMeasure,
    productRawMaterial: productRawMaterial,
    productDescriptions: productDescriptions,
    productCreator: productCreator,
    productUpdater: productUpdater
  });

  await newProduct
    .save()
    .then((product) => {
      return res.status(200).json({
        success: true,
        data: product
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        let errors = {};

        /* Adjust the error messages that "mongoose" sends. */
        Object.keys(err.errors).forEach((key) => {
          errors[key] = err.errors[key].message;
        });

        return res.status(400).json({
          success: false,
          message: 'failed',
          error: errors
        });
      }
    });
});

module.exports = router;
