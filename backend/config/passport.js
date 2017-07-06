// Import passport strategies
var facebookStrategy = require('passport-facebook').Strategy;

// Import validator
var validator = require('validator');

// Import models
var User = require('../model/User');

// Export passport
module.exports = function(passport) {

// Serialize user
  passport.serializeUser(function(user, done){
      done(null, user.id);
  });

// Deserialize user
  passport.deserializeUser(function(id, done){
      User.findById(id, function(err, user){
        done(err, user); // deserialize the user and store into req.user
      });
  });

// Passport Facebook Login
    passport.use(new facebookStrategy({
    clientID: '1900129696892874',
    clientSecret: '91612faf0b9471d576917d2a6d74579a',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone', 'gender'],
    passReqToCallback: true
    },
    function(req, accessToken, refreshToken, profile, done){

      // function to find a user in the database using facebook id
      User.findOne( {'facebook.id' : profile.id }, function(err, user){
        if(err){
          return done(err);
        }

        // if user is not found, create in database
        if(!user){
          const newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.facebook.token = accessToken;
          newUser.facebook.email = profile._json.email;
          newUser.facebook.name = `${profile.name.givenName} ${profile.name.familyName}`;
          newUser.facebook.photo = `https://graph.facebook.com/${profile.id}/picture?type=large`;
          newUser.tracks = [0,0,0];
          // save into database
          newUser.save(function(err){
            if(err){
              console.log(err);
            }
            return done(null, newUser, req.flash('success', {msg:'Logged in successfully'}));
          });
        }

        // If user is found log store email, name and photo from facebook into database
        if(user) {
            user.facebook.email = profile._json.email;
            user.facebook.name = `${profile.name.givenName} ${profile.name.familyName}`;
            user.facebook.photo = `https://graph.facebook.com/${profile.id}/picture?type=large`;
            user.save(function(err){
              if(err){
                return res.json('Could not get facebook details because ' + err);
              }
            });
            return done(null, user, req.flash('success', {msg:'Logged in successfully'}));
        }
      });
  }
));

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];
  const token = req.user.tokens.find(token => token.kind === provider);
  if (token) {
    next();
  }
  else {
    res.redirect(`/auth/${provider}`);
  }
}

};
