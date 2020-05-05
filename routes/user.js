const router = require('express').Router();
const userSchema = require('../models/userSchema');
const login = require('../helpers/login');

router.post('/register', (req, res) => {
  userSchema
    .create(req.body)
    .then(user => login(user.email, user.password))
    .then(loginData => res.status(loginData.status).json(loginData.send))
    .catch(err => {
      if (err.send) {
        res.status(err.status).json(err.send);
      } else if (err.name == 'MongoError' && err.code == 11000) {
        res.status(402).json({
          msg: `${
            Object.keys(err.keyValue)[0]
          } already exist please login directly`,
          err: err.errmsg
        });
      }
    });
});

router.post('/login', (req, res) => {
  login(req.body.email, req.body.password)
    .then(loginData => res.status(loginData.status).json(loginData.send))
    .catch(err => res.status(err.status).json(err.send));
});
module.exports = router;
