const router = require('express').Router();
const mongoose = require('mongoose');
const config = require('../config');
const sendMail = require('../helpers/sendMail');
const isSeller = require('../isSeller');
const itemSchema = require('../models/itemSchema');
const orderSchema = require('../models/orderSchema');
const userSchema = require('../models/userSchema');

router.get('/:orderId?', (req, res) => {
  if (req.params.orderId) {
    orderSchema
      .findById(req.params.orderId)
      .populate('itemId', 'name price')
      .then(item => res.json(item))
      .catch(err => console.log(err));
  } else {
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
  }
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
      ).then(orders => {
        res.json(orders);
        // notifing later on so that process will complete in frontend
        //Using forEach because might be google gmail will reject sending mail at the same time
        orders.forEach(order =>
          userSchema
            .findById(order.sellerId)
            .select('email')
            .then(seller =>
              sendMail({
                from: 'Harrapa',
                to: seller.email,
                subject: 'You have new order',
                text: `To review your product click on this link http://119.81.0.42:${config.port}/api/order/${order._id}`,
                onError: e => console.log(e),
                onSuccess: i => console.log(i)
              })
            )
        );
      })
    )

    .catch(err => console.log(err));
});

//-------------------seller-----------portion-------------------------------

router.post('/changeStatus/:orderId', isSeller, (req, res) => {
  //update order if orderId must belongs to this seller
  orderSchema
    .findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(req.params.orderId),
        sellerId: mongoose.Types.ObjectId(req.user.userId)
      },
      { $set: req.body },
      { new: true }
    )
    .populate('itemId', 'name price')
    .then(order => {
      res.json(order);
      //Make buyer notify about status change
      userSchema
        .findById(order.buyerId)
        .select('email')
        .then(user =>
          sendMail({
            from: 'Harrapa',
            to: user.email,
            subject: `Status of you order: ${order.itemId.name} is changed to ${order.status}`,
            text: `To review your product click on this link http://119.81.0.42:${config.port}/api/order/${order._id}`,
            onError: e => console.log(e),
            onSuccess: i => console.log(i)
          })
        );
    })
    .catch(err => console.log(err));
});

module.exports = router;
