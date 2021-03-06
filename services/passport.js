const mongoose = require('mongoose')
const User = mongoose.model('Users')
const passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
async function(username, password, done) {
 var user = await User.findOne({ Email: username })

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    var returnVal=await user.validPassword(username,password)
    if (!returnVal) {
      console.log('Incomplete password')
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
}
));

passport.serializeUser(function(user,done){
  console.log('user '+user.id)
  done(null,user.id)
})

passport.deserializeUser(function(id,done){
  User.findById(id).then(function(user){
    done(null,user)
  })
})
