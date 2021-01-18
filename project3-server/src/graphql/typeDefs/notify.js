import {gql} from 'apollo-server-express'

export default gql`
  
    extend type Mutation {
        getNotify (userId: String!): [Notify!]
    }
    extend type Query {
        getNotify (userId: String!): [Notify!],
        countNotify (userId: String!): Int
    }
    type Notify {
        id: ID!
        senderId: String!,
        receiverId: String!,
        isRead: Boolean!,
        type: String!
    }
    
    
`