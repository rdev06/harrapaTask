const router = require('express').Router();
const itemSchema = require('../models/itemSchema');
router.post('/add', (req, res) => {
  res.send('item to register');
});
module.exports = router;
