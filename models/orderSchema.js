const mongoose = require('mongoose');
//for defining schema
let orderSchema = mongoose.Schema(
  {
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'item' },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    quantity: { type: Number },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'dispatched'],
      default: 'pending',
      required: true
    },
    msgBySeller: { type: String }
  },
  {
    timestamps: true
  }
);

//for defining models
module.exports = mongoose.model('order', orderSchema);
