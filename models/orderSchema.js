const mongoose = require('mongoose');
//for defining schema
let orderSchema = mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'item',
      required: true
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    quantity: { type: Number, default: 1, required: true },
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
