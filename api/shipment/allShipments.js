const router = require('express').Router();

// Shipment Model
const Shipment = require('../../model/Shipment');

router.get('/allShipments', async (req, res) => {
  const allShipments = await Shipment.find({});

  if (allShipments === null || allShipments === undefined) {
    return res.status(400).json({
      success: false,
      message: 'No records found!'
    });
  } else {
    return res.status(200).json({
      success: true,
      message: 'Records found!',
      data: allShipments
    });
  }
});

module.exports = router;
