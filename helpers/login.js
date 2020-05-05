const jwt = require('jsonwebtoken');
const userSchema = require('../models/userSchema');
const config = require('../config');

async function login(email, password) {
  let user = await userSchema.findOne({ email }).exec();
  return await new Promise((resolve, reject) => {
    if (user) {
      if (user.password == password) {
        const token = jwt.sign(
          {
            userId: user._id,
            seller: user.seller
          },
          config.jwt_secrect_key,
          {
            expiresIn: config.jwt_expiresIn
          }
        );
        resolve({
          status: 200,
          send: { msg: 'logged in', token }
        });
      } else {
        reject({
          status: 401,
          send: { msg: `Password not match with this ${email}` }
        });
      }
    } else {
      reject({
        status: 400,
        send: { msg: `User not found with this ${email}` }
      });
    }
  });
}

module.exports = login;
