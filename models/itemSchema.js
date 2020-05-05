const mongoose = require('mongoose');
//for defining schema
let itemSchema = mongoose.Schema(
  {
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    moreInfo: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

//for defining models
module.exports = mongoose.model('item', itemSchema);
