const Auth0Strategy = require('passport-auth0');
const config = require('./config');
const passport = require('passport');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = new Auth0Strategy({
    domain:       config.auth0.domain,
    clientID:     config.auth0.clientID,
    clientSecret: config.auth0.clientSecret,
    callbackURL:  config.auth0.callbackURL
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);
