const router = require('express').Router();
const user = require('./user');
const general = require('./general');
const ensureLogin = require('../ensureLogIn');
const item = require('./item');
const order = require('./order');

router.use('/user', user);
router.use('/general', general);
router.use('/item', ensureLogin, item);
router.use('/order', ensureLogin, order);

router.use('/', (req, res) => res.send('this is api v1.0 for the project'));
module.exports = router;
