const router = require('express').Router();
const bcrypt = require('bcryptjs');
const config = require('../config');
const userSchema = require('../models/userSchema');
const login = require('../helpers/login');

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, config.bcryptGenSaltLength, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      userSchema
        .create({
          email: req.body.email,
          seller: req.body.seller,
          password: hash
        })
        .then(user => login(user.email, req.body.password))
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
    }
  });
});

router.post('/login', (req, res) => {
  login(req.body.email, req.body.password)
    .then(loginData => res.status(loginData.status).json(loginData.send))
    .catch(err => res.status(err.status).json(err.send));
});
module.exports = router;
