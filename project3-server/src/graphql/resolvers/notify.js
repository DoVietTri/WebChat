import {ApolloError} from 'apollo-server-express'

export default {    
    Query :{
        getNotify: async (_, {userId}, {Contact, Notify, User, notifyServer}) => {
            let notifies = await Notify.find({receiverId: userId})
            return notifies
        },
        countNotify: async (_, {userId}, {Notify}) => {
            let count = await Notify.count({
                $and: [
                    {receiverId: userId},
                    {isRead: false}
                ]
            })
            return count;
        }
    },
    Mutation:{
        getNotify: async (_, {userId}, {Contact, Notify, User, notifyServer}) => {
            let notifies = await Notify.find({receiverId: userId})
            return notifies
        }
    }
}