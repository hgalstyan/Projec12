const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const googlePlus = require("../config/key").googlePlus;
const User = require("../models/User");
const facebook = require("../config/key").facebook;


passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null,user.id);
    });
});

passport.use(new GoogleStrategy({
    callbackURL: "/auth/google/redirect",
    clientID: googlePlus.id,
    clientSecret: googlePlus.secret
},(accessToken, refreshToken, profile, done)=> {
    User.findOne({ googleId: profile.id }).then( currentUser=> {
      if(currentUser){
          //user already exists
          console.log("user is: "+ currentUser);
          done(null, currentUser);
      } else {
          new User({
              name: profile.displayName,
              googleId: profile.id
          }).save().then(newUser=>{
              console.log("new user created: "+ newUser);
              done(null, newUser);
          })
      }
    });
}));

passport.use(new FacebookStrategy({
    clientID: facebook.id,
    clientSecret: facebook.secret,
    callbackURL: "http://localhost:3000/auth/facebook/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ facebookId: profile.id }).then( currentUser=> {
        if(currentUser){
            //user already exists
            console.log("user is: "+ currentUser);
            done(null, currentUser);
        } else {
            new User({
                name: profile.displayName,
                facebookId: profile.id
            }).save().then(newUser=>{
                console.log("new user created: "+ newUser);
                done(null, newUser);
            })
        }
    });
  }
));

module.exports = passport;