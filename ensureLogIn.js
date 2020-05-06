const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./config');
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt_secrect_key
};
passport.use(new JwtStrategy(opts, (decode, done) => done(null, decode)));

module.exports = (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (error, user, info, status) => {
      if (error) {
        console.log(error);
      }
      if (user) {
        req.user = user;
        next();
      }
      if (info) {
        res.send(info.message);
      }
      if (status) {
        console.log('status');
        console.log(status);
      }
    }
  )(req, res, next);
};
