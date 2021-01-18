import mongoose from 'mongoose'

const NotifySchema =  new mongoose.Schema({
    senderId : String,
    receiverId: String,
    isRead : {type: Boolean, default: false},
    type: String, //add contact or remove contact,...
    
},{
    timestamps: true
})

const Notify = mongoose.model('notifications', NotifySchema, 'notify')

export default Notify
