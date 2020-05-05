const router = require('express').Router();
const itemSchema = require('../models/itemSchema');
const orderSchema = require('../models/orderSchema');

/* router.post('/make', (req, res) => {
  //fetch data for items asynchromously
  Promise.all(
    req.body.items.map(item =>
      itemSchema.findById(item.itemId).select('sellerId name -_id').exec()
    )
  ).then(items => {
      item
  });
}); */

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

module.exports = router;

/*   itemSchema
    .findById(req.body.itemId)
    .select('sellerId -_id')
    .exec()
        .then(item => {
        if (item.sellerId == req.user.userId) {
            res.json({msg:'You can not add this item as '})
        } else {
            orderSchema.create(
                Object.assign(
                  {
                    sellerId: item.sellerId,
                    buyerId: req.user.userId
                  },
                  req.body
                )
              )
            )
            .then(order => res.json(order)
        }
    }
      )
    .catch(err => console.log(err)) */
