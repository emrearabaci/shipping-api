const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productCode: {
    type: String,
    minLength: [
      3,
      'The length of "product code" must be at least 3 characters.'
    ],
    uppercase: true,
    unique: true,
    required: [true, '"Product Code" field is required.']
  },
  productName: {
    type: String,
    required: [true, '"Product Name" field is required.']
  },
  productCustomer: {
    type: Array,
    lowercase: true,
    required: [true, '"Product Code" field is required.']
  },
  productUnitCost: {
    type: Number,
    required: false
  },
  productUnitPrice: {
    type: Number,
    required: false
  },
  productUnit: {
    type: String,
    required: [true, '"Product Unit" field is required.']
  },
  productNetMeasure: {
    type: Number,
    required: false
  },
  productGrossMeasure: {
    type: Number,
    required: false
  },
  productRawMaterial: {
    type: String,
    lowercase: true,
    required: false
  },
  productDescription: {
    type: String,
    lowercase: true,
    required: false
  },
  productCreator: {
    type: String,
    required: [true, '"Creator" field is required.']
  },
  productCreationDate: {
    type: Date,
    default: Date.now()
  },
  productUpdater: {
    type: String,
    required: [true, '"Updater" field is required.']
  },
  productLastUpdatedDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Product', productSchema, 'product');
