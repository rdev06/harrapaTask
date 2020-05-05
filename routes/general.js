const router = require('express').Router();
const mongoose = require('mongoose');
const itemSchema = require('../models/itemSchema');

router.get('/items', (req, res) =>
  itemSchema
    .find()
    .populate('sellerId', 'email')
    .then(items => res.json(items))
    .catch(err => console.log(err))
);

router.get('/sellerItems/:sellerId', (req, res) => {
  itemSchema
    .find({ sellerId: mongoose.Types.ObjectId(req.params.sellerId) })
    .populate('sellerId', 'email')
    .then(items => res.json(items))
    .catch(err => console.log(err));
});
module.exports = router;
