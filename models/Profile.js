const mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    img: { data: Buffer, contentType: String },
    UserID: String
});

var Profile = mongoose.model('Profile',profileSchema)