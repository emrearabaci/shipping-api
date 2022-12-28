const router = require('express').Router();

// Product Model
const Product = require('../../model/Product');

router.get('/searchProduct/:productCode', async (req, res) => {
  let productCode = req.params.productCode;

  const searchProduct = await Product.find({ productCode: productCode });

  if (searchProduct === null || searchProduct === undefined) {
    return res.status(400).json({
      success: false,
      message: 'No records found!'
    });
  } else {
    return res.status(200).json({
      success: true,
      message: 'Records found!',
      data: searchProduct
    });
  }
});

module.exports = router;
