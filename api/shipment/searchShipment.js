const router = require('express').Router();

// Shipment Model
const Shipment = require('../../model/Shipment');

router.get('/searchShipment/:shipmentCode', async (req, res) => {
  let shipmentCode = req.params.shipmentCode;

  const searchShipment = await Shipment.find({ shipmentCode: shipmentCode });

  if (searchShipment === null || searchShipment === undefined) {
    return res.status(400).json({
      success: false,
      message: 'No records found!'
    });
  } else {
    return res.status(200).json({
      success: true,
      message: 'Records found!',
      data: searchShipment
    });
  }
});

module.exports = router;
