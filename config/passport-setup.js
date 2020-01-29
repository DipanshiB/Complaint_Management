const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user');
const GoogleUser = require('../models/google_user');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "/auth/google/redirect"
  },(accessToken, refreshToken, profile, done) => {
    console.log(profile);
    console.log("we reached here, now proceed to create a user");
    new GoogleUser({
      name : profile.displayName,
      googleId : profile.id
    }).save().then((newGUser) => {
      console.log("new Google user created :" , newGUser);
    });
  })
);

module.exports = function(passport) {
  passport.use(
    new LocalStrategy((id, password, done) => {
      User.findById(id, (err, user)=> {if(err) {console.log(err)}})
       .then(user => {
         if(!user) {
           return done(null, false, {message : 'Not registered'});
         }
         bcrypt.compare(password, user.password, (err, isMatch) => {
           if(err) throw err;
           if(isMatch) {
             return done(null, user);
           } else{
             return done(null, false, {message : 'Password Incorrect'});
           }
         })
       })
       .catch(err => console.log(err));
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.serializeUser(function(google_user, done) {
    done(null, google_user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

}
