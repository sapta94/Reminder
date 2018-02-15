const mongoose = require('mongoose')
const User = mongoose.model('Users')
const Profile=mongoose.model('Profile')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const webpush = require('web-push')
const passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;


module.exports = function(app){
    /** API to register users */
    console.log(webpush.generateVAPIDKeys())
    webpush.setVapidDetails(
        'mailto:dey7.kol@gmail.com',
        'BFUl0pKf3ETB9ytnG66al40EfjDP4FS1ago4GGk_8VzLey5ebSOc0nCpt9FdlL7A8x34GwffOyQSElMvftGhyrE',
        '7k1wiq_UUUEowAq8tYyV_i3KlNtDXtmB6facuNqr430'
    )
    app.post('/api/register',async function(req,res){
        var firstName = req.body.firstname||null;
        var lastName = req.body.lastname||null;
        var password = req.body.password||null;
        var email = req.body.email||null;
        var picID = req.body.picID||null;
        // var endpoint = req.body.endpoint||null;
        // var authSecret = req.body.authSecret||null;

        // const pushSubscription={
        //     endpoint:endpoint,
        //     keys:{
        //         auth:authSecret,
        //         p256h:key
        //     }
        // }
        var body="Thanks for Registering"
        var iconUrl="https://dcassetcdn.com/design_img/2537258/633663/633663_13633192_2537258_9fb8aabd_thumbnail.png"

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
        var updateRes = await Profile.findByIdAndUpdate(picID,{$set:{"UserID":'USER'+userID}},{ new: true })

        // var pushRes = await webpush.sendNotification(pushSubscription,
        //     JSON.stringify({
        //         msg:body,
        //         url:'http://localhost:3000/',
        //         icon:iconUrl,
        //         type:'register'
        //     }))
        //console.log(user)
        res.json({
            status:200,
            message:'success'
        })
    })

    app.post('/api/login', 
    passport.authenticate('local', { failureRedirect: '/api/failedLogin' }),
    function(req, res) {
      res.send({
          message:'success',
          data:req.user
      });
    });

   app.get('/api/failedLogin',function(req,res){
       res.send({
           status:200,
           message:'fail'
       })
   })

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
        UserID:''
    });
    console.log(req.files)
    newItem.img.data = fs.readFileSync(req.files[0].path)
    newItem.img.contentType = 'image/png';
    var result=await newItem.save();
    if(result){
        res.json({
            status:200,
            resData:result._id,
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
       var userID=req.user.UserID;
       console.log(userID)
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
