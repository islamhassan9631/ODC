
const passport = require("passport")
const GoogleStrategy =require("passport-google-oauth20").Strategy
const FacebookStrategy= require("passport-facebook").Strategy
const User = require("../db/models/user.model")
passport.use(new GoogleStrategy ({
clientId:process.env.GoogleClientId,
clentSecret:process.env.GoogleClientId,
callbackURL:process.env.GoogelCallBack,
passReqToCallback: true,
},
function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }

))
//////
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOKCallback,
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));




passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
