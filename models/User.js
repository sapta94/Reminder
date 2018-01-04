const mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    FirstName: String,
    LastName: String,
    UserID: String,
    Password: String
});

var User = mongoose.model('User',userSchema)
userSchema.methods.validPassword= async function(userID,pass){
    
      var getUser=await User.findOne({UserID:userID});
      console.log(getUser)
      var flag=bcrypt.compareSync(pass, getUser.Password);

      if(flag){
          console.log(flag)
          return true;
      }
      else{
        console.log(flag)
          return false;
      }
}

mongoose.model('Users',userSchema) 