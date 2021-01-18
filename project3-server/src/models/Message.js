import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
    senderId : String,
    receiverId : String,
    text: 
        [
            {
                sender: String,
                time: Date,
                content: String
            }
        ],
        
    
},{
    timestamps: true
})

const Message = mongoose.model('messages', MessageSchema, 'message')

export default Message
