const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const notiSchema = new Schema({
    Title: String,
    Description: String,
    UserID: String,
    CreateTime: Number,
    NotifyTime:Number
});

mongoose.model('Notification',notiSchema)
