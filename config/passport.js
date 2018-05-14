const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport) {
  let opts = {};
//  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('jwt');
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    //console.log(type(jwt_payload));
    //ATTENTION  AU PAYLOAD A CHANGER AVEC UN DOC. OU UN DATA.
    //User.getUserById(jwt_payload._doc._id, (err, user) => {
    User.getUserById(jwt_payload.data._id, (err, user) => {
      if(err) {
        return done(err, false);
      }

      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}
