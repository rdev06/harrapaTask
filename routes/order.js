const router = require('express').Router();
const mongoose = require('mongoose');
const itemSchema = require('../models/itemSchema');
const orderSchema = require('../models/orderSchema');

router.get('/', (req, res) => {
  let whereCondition =
    req.query.showSeller == 'true'
      ? { sellerId: mongoose.Types.ObjectId(req.user.userId) }
      : { buyerId: mongoose.Types.ObjectId(req.user.userId) };
  req.query.status ? (whereCondition['status'] = req.query.status) : '';
  orderSchema
    .find(whereCondition)
    .populate('itemId', 'name price')
    .then(order => res.json(order))
    .catch(err => console.log(err));
});

router.post('/addToCart', (req, res) =>
  itemSchema
    .findById(req.body.itemId)
    .select('sellerId -_id')
    .exec()
    .then(item => {
      if (!item) {
        res.status(404).json({
          msg:
            'Unknown Error Item does not exit try to clear your browser catche'
        });
      } else if (item.sellerId == req.user.userId) {
        res.status(401).json({
          msg:
            'You can not add this item to cart as you are only seller of this item'
        });
      } else {
        res.json({ msg: true });
      }
    })
    .catch(err => console.log(err))
);

router.post('/make', (req, res) => {
  //fetch data for items asynchromously
  Promise.all(
    req.body.items.map(item =>
      itemSchema.findById(item.itemId).select('sellerId -_id').lean().exec()
    )
  )
    .then(itemSellers =>
      //create orders all in one go asynchronously
      Promise.all(
        req.body.items.map((item, i) =>
          orderSchema.create(
            Object.assign(
              { buyerId: req.user.userId },
              Object.assign(itemSellers[i], item)
            )
          )
        )
      ).then(orders => res.json(orders))
    )

    .catch(err => console.log(err));
});

//-------------------seller-----------portion-------------------------------

module.exports = router;
