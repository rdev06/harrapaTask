const router = require('express').Router();
const itemSchema = require('../models/itemSchema');
const isSeller = require('../isSeller');

router.post('/add', isSeller, (req, res) => {
  itemSchema
    .create(Object.assign({ sellerId: req.user.userId }, req.body))
    .then(item => res.json(item))
    .catch(err => console.log(err));
});
module.exports = router;
