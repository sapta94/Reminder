const mongoose = require('mongoose')
const User = mongoose.model('Users')


module.exports = function(app){
    /** API to register users */
    app.post('/register',async function(req,res){
        var firstName = req.body.firstName||null;
        var lastName = req.body.lastName||null;
        var password = req.body.password||null;

        const user = await new User({
            FirstName:firstName,
            LastName:lastName,
            Password:password,
            UserID:'USER001'
        }).save();

        console.log(user)
        res.json({
            status:200,
            message:'success'
        })
    })
}
