import {gql} from 'apollo-server-express'

export default gql`

    extend type Mutation {
        createGroup(idRole: String!, roomName: String!): ChatGroup!
    }
    extend type Mutation {
        joinGroup(userId: String!, code: String!): SendStatus!
    }

    extend type Mutation {
        getGroupList(userId: String!): [ChatGroup!]
    }

    extend type Mutation {
        getGroupConversation(userId: String!, id: String!): ChatGroup
    }

    extend type Mutation {
        sendMessGroup(senderId: String!, idGroup: String!, content: String!): MessageContentGroup!
    }

    extend type Query {
        getGroupList(userId: String!): [ChatGroup!]
    }

    type ChatGroup {
        id: ID!
        name: String!
        code: String!
        admin: String!
        member: [String!]
        message: [MessageContentGroup!]
    }

    type SendStatus {
        status: String!
    }

    type MessageContentGroup {
        senderId: String!
        senderName: String!
        content: String!
    }
`