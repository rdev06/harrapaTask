const mongoose = require('mongoose');
//for defining schema
let userSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    seller: { type: Boolean, default: false, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

//for defining models
module.exports = mongoose.model('user', userSchema);
