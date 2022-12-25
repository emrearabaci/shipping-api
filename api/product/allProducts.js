const router = require('express').Router();

// Product Model
const Product = require('../../model/Product');

router.get('/allProducts', async (req, res) => {
  const allProducts = await Product.find({});

  if (allProducts === null || allProducts === undefined) {
    return res.status(400).json({
      success: false,
      message: 'No records found!'
    });
  } else {
    return res.status(200).json({
      success: true,
      message: 'Records found!',
      data: allProducts
    });
  }
});

module.exports = router;
