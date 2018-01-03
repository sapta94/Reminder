const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    FirstName: String,
    LastName: String,
    UserID: String,
    Password: String
});

mongoose.model('Users',userSchema) 