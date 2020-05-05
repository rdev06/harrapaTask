const router = require('express').Router();
const user = require('./user');
const item = require('./item');

router.use('/user', user);
router.use('/item', item);

router.use('/', (req, res) => res.send('this is api v1.0 for the project'));
module.exports = router;
