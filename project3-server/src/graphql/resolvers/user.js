// import User from '../../models/User'
import {ApolloError} from 'apollo-server-express'
import {hash, compareSync} from 'bcryptjs'
import {genToken, getPayload} from '../../utils/user.util'

export default  {
   
    Mutation :{
        login : async (_, {email, password}, {User, ChatGroup, chatServer}) => {

            let user = await User.findOne({email: email})
            if (!user) throw new ApolloError("User not found", '404')
            let matchPass = compareSync(password, user.password)
            if (!matchPass){
                throw new ApolloError ("Invalid password", '404')
            }
            let payload = getPayload(user)
            let token = await genToken(payload)
            return {
                user: user,
                token: token
            }
        },
        signup: async (_, {newUser}, {User}) => {
            
            const {email, name, password} = newUser
            let exist = await User.exists({email: email})
            if (exist) throw new ApolloError("User existed", "404")
            let user = new User()
            user.email = email
            user.password = await hash(password, 10)
            user.name = name
            
            let createUser = await user.save()
            let payload = getPayload(createUser)
            let token = await genToken(payload)

            return ({
                user: createUser,
                token: token
            })
        },
        searchByName: async(_, {name}, {User})=>{

            let regex = new RegExp(name.toLowerCase().trim(), 'i')
            let users = await User.find({
                $or:[
                    {id: {$regex: regex}},
                    {name: {$regex: regex}}
                ]
            })

            return users
        },
        getUserInfo: async (_, {userId}, {User} ) => {
            let user = await User.findById(userId)
            return user
        }

    }
}