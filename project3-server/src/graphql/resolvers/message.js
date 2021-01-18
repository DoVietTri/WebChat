import { times } from 'lodash'
// import Message from '../../models/Message'

export default {
    Query: {
        getConversation: async (_, { senderId, receiverId }, { User, Message }) => {
            // 
     
            let conversation = await Message.findOne({ 
                $or: [
                    { senderId: senderId, receiverId: receiverId },
                    { senderId: receiverId, receiverId: senderId}
                ]
            })
            
            return conversation

        },
    },

    Mutation: {
        getAllConversation: async (_, { senderId, receiverId }, { User, Message })=>{
            let conversations = await Message.find({senderId: senderId})
            return conversations
        },
        
        sendMessage: async (_, { senderId, receiverId, content }, { User, Message, chatServer }) => {
            

            let conversation = await Message.findOne(
                {
                    $or: [
                        { senderId: senderId, receiverId: receiverId },
                        { senderId: receiverId, receiverId: senderId}
                    ]
                }
            )

            await conversation.updateOne({text: [{sender: senderId, time: new Date(), content: content},...conversation.text]})
            chatServer.to(receiverId).emit('receive-msg', {senderId: senderId ,msg :content})
            return {status: true}
        },
        getConversation: async (_, { senderId, receiverId }, { User, Message }) => {
            // 
            let conversation = await Message.findOne({ 
                $or: [
                    { senderId: senderId, receiverId: receiverId },
                    { senderId: receiverId, receiverId: senderId}
                ]
            })
            conversation.text = conversation.text.reverse()
            return conversation

        },
        
    }
}