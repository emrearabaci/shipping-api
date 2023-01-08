const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  productInfo: {
    type: Array,
    required: [true, '"Product Info" is required.']
  },
  shipmentCode: {
    type: String,
    minLength: [
      12,
      'The length of "Shipment Code" must be at least 12 characters.'
    ],
    maxLength: [
      14,
      'The length of "Shipment Code" must be a maximum of 14 characters.'
    ],
    unique: true,
    required: [true, '"Shipment Code" field is required.']
  },
  shipmentQuantity: {
    type: Number,
    required: [true, '"Product Quantity" field is required.']
  },
  shipmentUnitPrice: {
    type: Number,
    required: [true, '"Unit Price" field is required.']
  },
  shipmentFrom: {
    type: String,
    required: [true, '"Shipment From" field is required.']
  },
  shipmentTo: {
    type: String,
    required: [true, '"Shipment To" field is required.']
  },
  shipmentRequestedBy: {
    type: String,
    required: [true, '"Requested By" field is required.']
  },
  shipmentRequestedDate: {
    type: Date,
    required: [true, '"Requested Date" field is required.']
  },
  shipmentRequestedTime: {
    type: String,
    required: [true, '"Requested Time" field is required.']
  },
  shipmentCompletedDate: {
    type: Date
  },
  shipmentCompletedTime: {
    type: String
  },
  shipmentVerifiedBy: {
    type: String
  },
  shipmentDescriptions: {
    type: String
  },
  shipmentStatus: {
    type: String,
    default: 'raw'
  },
  shipmentCreator: {
    type: String,
    unique: false,
    required: [true, '"Creator" field is required.']
  },
  shipmentCreationDate: {
    type: Date,
    default: Date.now()
  },
  shipmentUpdater: {
    type: String,
    unique: false,
    required: [true, '"Updater" field is required.']
  },
  shipmentLastUpdatedDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Shipment', shipmentSchema, 'shipment');
