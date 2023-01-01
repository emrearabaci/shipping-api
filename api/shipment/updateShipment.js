const router = require('express').Router();

// Shipment Model
const Shipment = require('../../model/Shipment');

router.post('/updateShipment', async (req, res) => {
  let { shipmentCode, shipmentStatus } = req.body.shipmentUpdateForm;

  await Shipment.findOneAndUpdate(
    { shipmentCode: shipmentCode },
    { shipmentStatus: shipmentStatus },
    { new: true }
  )
    .then((updatedShipment) => {
      return res.status(200).json({
        success: updatedShipment,
        data: updatedShipment
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
