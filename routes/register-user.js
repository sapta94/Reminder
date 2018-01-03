const mongoose = require('mongoose')
const User = mongoose.model('Users')


module.exports = function(app){
    /** API to register users */
    app.post('/register',async function(req,res){
        var firstName = req.body.firstName||null;
        var lastName = req.body.lastName||null;
        var password = req.body.password||null;

        const existingUser = await User.find().sort({_id:-1}).limit(1);
        if(existingUser){
            console.log(existingUser)
            var userID = parseInt((existingUser[0].UserID).substr(4))+1;
        } 
        else
            return
        const user = await new User({
            FirstName:firstName,
            LastName:lastName,
            Password:password,
            UserID:'USER'+userID
        }).save();

        console.log(user)
        res.json({
            status:200,
            message:'success'
        })
    })
}
