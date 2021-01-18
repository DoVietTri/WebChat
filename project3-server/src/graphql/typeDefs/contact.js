import {gql} from 'apollo-server-express'

export default gql`
    scalar Date
    extend type Mutation {
        addFriend(userId: String!, contactId: String!): Contact!
    }
    extend type Mutation {
        getUserContact(userId: String!): [Contact!]
    }
    extend type Mutation {
        acceptFriend(userId: String!, contactId: String!, type: String!): Contact!
    }
    extend type Query{
        getFriendList(userId: String!): [User!]
    }
    type Contact {
        id: ID!
        userId: String!
        contactId: String!
        status: Boolean!
        createdAt: Date!
    }
    

`