const router = require('express').Router();

// Shipment Model
const Shipment = require('../../model/Shipment');

router.post('/filterShipment', async (req, res) => {
  let { productCode, startingDate, endingDate, shipmentStatus } =
    req.body.shipmentFilterForm;

  await Shipment.find({
    'productInfo.productCode': productCode,
    shipmentRequestedDate: {
      $gte: startingDate,
      $lte: endingDate
    },
    shipmentStatus: shipmentStatus
  })
    .then((filterResult) => {
      if (filterResult.length === 0) {
        return res.status(200).json({
          success: false,
          message: 'No records found. Make sure the form fields are correct.'
        });
      } else {
        let filteredShipments = filterResult;

        let grossMeasures = [];
        let netMeasures = [];
        let costs = [];
        let prices = [];

        for (let i = 0; i < filteredShipments.length; i++) {
          grossMeasures.push(
            filteredShipments[i].productInfo[0].productGrossMeasure *
              filteredShipments[i].shipmentQuantity
          );
          netMeasures.push(
            filteredShipments[i].productInfo[0].productNetMeasure *
              filteredShipments[i].shipmentQuantity
          );
          costs.push(
            filteredShipments[i].productInfo[0].productUnitCost *
              filteredShipments[i].shipmentQuantity
          );
          prices.push(
            filteredShipments[i].productInfo[0].productUnitPrice *
              filteredShipments[i].shipmentQuantity
          );
        }

        let totalGrossMeasure = grossMeasures.reduce((acc, value) => {
          return acc + value;
        }, 0);
        let totalNetMeasure = netMeasures.reduce((acc, value) => {
          return acc + value;
        });
        let totalCost = costs.reduce((acc, value) => {
          return acc + value;
        }, 0);
        let totalPrice = prices.reduce((acc, value) => {
          return acc + value;
        }, 0);

        let calculatedResults = {
          gross: {
            grossMeasures,
            totalGrossMeasure
          },
          net: {
            netMeasures,
            totalNetMeasure
          },
          cost: {
            costs,
            totalCost
          },
          price: {
            prices,
            totalPrice
          }
        };

        return res.status(200).json({
          success: true,
          message: 'Records found!',
          data: filteredShipments,
          calculatedResults
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        message: 'Error!',
        error: err
      });
    });
});

module.exports = router;
