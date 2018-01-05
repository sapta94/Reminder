const mongoose=require('mongoose')
const Notification = mongoose.model('Notification')
const requireUser = require('./requireUser')

module.exports = function(app){
    app.post('/insert/noti',requireUser,async function(req,res){
        var userID = req.body.userID||null
        var title = req.body.title||null
        var description=req.body.description||null
        var createTime=Date.now()||null
        var notifyTime=req.body.notifyTime||null

        const notify = await new Notification({
            Title:title,
            Description:description,
            CreateTime:createTime,
            NotifyTime:notifyTime,
            UserID:userID
        }).save();

        if(!notify){
            res.json({
                status:200,
                message:'fail'
            })
            return
        }
        
        res.json({
            status:200,
            message:'success'
        })
        return

    })
}