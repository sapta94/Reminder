const mongoose = require('mongoose')
const User = mongoose.model('Users')
const Profile=mongoose.model('Profile')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;


module.exports = function(app){
    /** API to register users */
    app.post('/api/register',async function(req,res){
        var firstName = req.body.firstname||null;
        var lastName = req.body.lastname||null;
        var password = req.body.password||null;
        var email = req.body.email||null;

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
            Email:email,
            Password:hash,
            UserID:'USER'+userID
        }).save();

        //console.log(user)
        res.json({
            status:200,
            message:'success'
        })
    })

    app.post('/api/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.send({
          message:'success',
          data:req.user
      });
    });

  app.get('/api/logout',function(req,res){
    console.log('logout')
    req.logout();
    res.redirect('/');
    // res.json({
    //     message:'Logged Out'
    // })
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
    res.send(req.user)
  })

  app.post('/api/photo',async function(req,res){
    var newItem = new Profile({
        UserID:'USER2'
    });
    console.log(req.files)
    newItem.img.data = fs.readFileSync(req.files[0].path)
    newItem.img.contentType = 'image/png';
    var result=await newItem.save();
    if(result){
        res.json({
            status:200,
            message:'success'
        })
    }
    else{
        res.json({
            status:200,
            message:'fail'
        })
    }
   });

   app.get('/api/fetch/photo',async function(req,res){
       var userID='USER2';
       var result = await Profile.findOne({UserID:userID})

       if(result){
           var base64 = (result.img.data.toString('base64'));
           res.json({
               status:200,
               data:base64
           })
       }
       else{
        res.json({
            status:200,
            data:[]
        }) 
       }

   })
}
