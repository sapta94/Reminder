const mongoose = require('mongoose')
const User = mongoose.model('Users')
const passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user,done){
  done(null,user.id)
})

passport.deserializeUser(function(id,done){
  User.findById(id).then(function(user){
    done(null,user)
  })
})

passport.use(new LocalStrategy(
function(username, password, done) {
  User.findOne({ UserID: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.validPassword(username,password)) {
      console.log('Incomplete password')
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
}
));