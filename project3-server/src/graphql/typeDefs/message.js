import {gql} from 'apollo-server-express'

export default gql`
    
    extend type Mutation {
        getAllConversation (senderId: String!) : [Message]
    }
    extend type Query {
        getConversation (senderId: String!, receiverId: String!): Message
    }
    extend type Mutation {
        getConversation (senderId: String!, receiverId: String!): Message
    }
    extend type Mutation {
        sendMessage (senderId: String!, receiverId: String!, content: String!): SendStatus!
    }
    type Message {
        id: ID!
        senderId: String!,
        receiverId: String!,
        text: [MessageContent!]
    }

    type MessageContent {
        sender: String!,
        time: Date!,
        content: String!
    }
    
`