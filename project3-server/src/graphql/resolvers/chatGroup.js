
import {ChatGroup, User} from './../../models'

export default {

    Mutation: {
        createGroup: async (_, {idRole, roomName}, {ChatGroup}) => {
            let newGroup = new ChatGroup()
            newGroup.name = roomName
            newGroup.admin = idRole
            newGroup.code = Math.floor(Math.random()*100000)
            let createGroup = await newGroup.save()

            return createGroup
        },

        joinGroup: async (_, {userId, code}, {ChatGroup}) => {
            let group = await ChatGroup.findOne({code: code})
            
            if (group === null) {
                return {status: 'group-not-found'}
            }

            let arrUsers = []
            arrUsers.push(group.admin)
            arrUsers = arrUsers.concat(group.member)
            if (arrUsers.indexOf(userId) !== -1) {
                return {status: 'exists'} 
            }
           
            await group.updateOne({ member: [userId,...group.member]})
            return {status: 'success'}
        },
        
        getGroupList: async (_, {userId}, {ChatGroup}) => {
            let groups = await ChatGroup.find({
                $or: [
                    {admin: userId},
                    {member: {$in: [userId]}}
                ]
            })
            return groups
        },

        getGroupConversation: async (_, {userId, id}, {ChatGroup}) => {
            let group = await ChatGroup.findOne({
                $and: [
                    {$or: [
                        {admin: userId},
                        {member: {$in: [userId]}}
                    ]},
                    {_id: id}
                ]
            })

            group.message = group.message.reverse()
            return group
        },

        sendMessGroup: async (_, {senderId, idGroup, content}, {ChatGroup, User, chatServer}) => {
            let sender = await User.findById(senderId)
            let group = await ChatGroup.findOne({
                $and: [
                    {$or:[
                        {admin: senderId},
                        {member: {$in: [senderId]}}
                    ]},
                    {_id: idGroup}
                ]
            })

            let arrUsers = []
            arrUsers.push(group.admin)
            arrUsers = arrUsers.concat(group.member)
            arrUsers = arrUsers.filter(item => item !== senderId)


            await group.updateOne({ message: [{senderId: senderId, senderName: sender.name, content}, ...group.message] })

            return {senderId: senderId, senderName: sender.name, content: content}
        }
    },

    Query: {
        getGroupList: async (_, {userId}, {ChatGroup}) => {

            let groups = await ChatGroup.find({
                $or: [
                    {admin: userId},
                    {member: {$in: [userId]}}
                ]
            })
            return groups
        }
    }

}
