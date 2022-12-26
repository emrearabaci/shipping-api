const router = require('express').Router();

// Shipment Model
const Shipment = require('../../model/Shipment');

router.post('/newShipment', async (req, res) => {
  let {
    productCode,
    shipmentQuantity,
    shipmentUnitPrice,
    shipmentFrom,
    shipmentTo,
    shipmentRequestedBy,
    shipmentRequestedDate,
    shipmentRequestedTime,
    shipmentCompletedDate,
    shipmentCompletedTime,
    shipmentVerifiedBy,
    shipmentDescription,
    shipmentStatus,
    shipmentCreator,
    shipmentUpdater
  } = req.body.newShipmentForm;

  const newShipment = new Shipment({
    productCode: productCode,
    shipmentQuantity: shipmentQuantity,
    shipmentUnitPrice: shipmentUnitPrice,
    shipmentFrom: shipmentFrom,
    shipmentTo: shipmentTo,
    shipmentRequestedBy: shipmentRequestedBy,
    shipmentRequestedDate: shipmentRequestedDate,
    shipmentRequestedTime: shipmentRequestedTime,
    shipmentCompletedDate: shipmentCompletedDate,
    shipmentCompletedTime: shipmentCompletedTime,
    shipmentVerifiedBy: shipmentVerifiedBy,
    shipmentDescription: shipmentDescription,
    shipmentStatus: shipmentStatus,
    shipmentCreator: shipmentCreator,
    shipmentUpdater: shipmentUpdater
  });

  await newShipment
    .save()
    .then((shipment) => {
      return res.status(200).json({
        success: true,
        data: shipment
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
