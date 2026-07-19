const mongoose = require('mongoose');

const BillItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  qty: Number
}, { _id: false });

const BillSchema = new mongoose.Schema({
  customer: { type: String, default: '' },
  items: [BillItemSchema],
  subtotal: Number,
  taxPct: Number,
  taxAmt: Number,
  total: Number
}, { timestamps: true });

module.exports = mongoose.model('Bill', BillSchema);
