const mongoose = require('mongoose')
const User = mongoose.model('Users')
const bcrypt = require('bcryptjs')
const passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;


module.exports = function(app){
    /** API to register users */
    app.post('/api/register',async function(req,res){
        var firstName = req.body.firstname||null;
        var lastName = req.body.lastname||null;
        var password = req.body.password||null;

        const existingUser = await User.find().sort({_id:-1}).limit(1);
        if(existingUser){
            console.log(existingUser)
            var userID = parseInt((existingUser[0].UserID).substr(4))+1;
        } 
        else
            return
        var hash = bcrypt.hashSync(password, 10);
        const user = await new User({
            FirstName:firstName,
            LastName:lastName,
            Password:hash,
            UserID:'USER'+userID
        }).save();

        //console.log(user)
        res.json({
            status:200,
            message:'success'
        })
    })

    app.post('/api/login',function(req,res,next){
        passport.authenticate('local', function(err, user) {
            if (err) {
                return next(err); // Error 500
            }

            if (!user) {
                //Authentication failed
                return res.json(401, { "error": err }); 
            }
            //Authentication successful
            req.user=user;
            req.login(user, function(err) {
                if (err) { return next(err); }
                return res.redirect('/api/success');
            });

            //res.send(200);
        })(req, res, next)
    });

  app.get('/api/logout',function(req,res){
    console.log('logout')
    req.logout();
    //res.redirect('/');
    res.json({
        message:'Logged Out'
    })
  })

  app.get('/api/success',function(req,res){
      //res.redirect('http://localhost:8081/reminder/new')
      console.log('user is '+req.session.user)
      res.send({
          message:'success',
          data:req.user
      })
  })

  app.get('/api/currentUser',function(req,res){
    console.log('user is '+req.user)
    res.send(req.session.user)
  })
}
