import mongoose, { mongo } from 'mongoose'

const ChatGroupSchema = new mongoose.Schema({
    name: String,
    // userAmount: {type: Number, min: 3, max: 100},
    code: Number,
    admin: String,  //role of user in chat roon
    member : [String],
    message: [
        {
            senderId: String,
            senderName: String,
            content: String
        }
    ],
    
},{
    timestamps: true
})

export default mongoose.model('chatGroup', ChatGroupSchema, 'group')
