import {ApolloError} from 'apollo-server-express'
import {Kind} from 'graphql/language'
import {GraphQLScalarType} from 'graphql'
import {User, Contact} from '../../models'
export default {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value)
        },
        serialize(value){
            return value.getTime()
        },
        parseLiteral(ast){
            if (ast.kind === Kind.INT){
                return parseInt(ast.value, 10)
            }
            return null
        }
    }),

    Mutation:{
        addFriend: async (_, {userId, contactId}, {Contact, Notify, User, notifyServer})=>{
            let newContact = new Contact()
            newContact.userId = userId
            newContact.contactId = contactId
            let createContact = await newContact.save()

            let sender = await User.findById(userId)
            notifyServer.to(contactId).emit("receive-add-fr-notify", {msg: sender.name + " send you a friend request"})
            let newNotify = new Notify()
            newNotify.senderId = userId
            newNotify.receiverId = contactId
            newNotify.type = `${sender.name} Send You A Friend Request`
            newNotify.save()
            return createContact
        },
        getUserContact: async (_, {userId}, {Contact, Notify, User, notifyServer}) => {
            let userContacts = await Contact.find({userId: userId})
            return userContacts
        },

        acceptFriend: async (_, {userId, contactId, type}, {Contact, Notify, User, Message, notifyServer}) => {

            let updateContact = await Contact.findOneAndUpdate({userId: contactId, contactId: userId}, {
                status: true
            },{new: true})

            await Notify.findOneAndDelete({senderId : contactId, receiverId: userId, type: type})
            let sender = await User.findById(userId)

            let newNotify = new Notify()
            newNotify.senderId = userId
            newNotify.receiverId = contactId
            newNotify.type = `${sender.name} Accepted Your Friend Request`
            newNotify.save()

            let conversation1 = new Message()
            conversation1.senderId = userId
            conversation1.receiverId = contactId
            conversation1.text = []
            conversation1.save()

            

            notifyServer.to(userId).emit("receive-accept-friend", {msg: sender.name + " Accepted Your Friend Request"})
            return updateContact
        },

        
    },
    Query: {
        getFriendList: async (_, {userId}, {}) => {
            let contactList = await Contact.find({
                $or:[
                    {userId: userId},
                    {contactId: userId}
                ],
                $and: [{status: true}]
            })
            let ids = [...contactList.map((doc)=>doc.userId), ...contactList.map((doc)=>doc.contactId)]
            let set = new Set(ids)
            set.delete(userId)
            let IDs = Array.from(set)

            let friendList = await User.find({_id: {$in: IDs}})
            return friendList
        }
    }
}