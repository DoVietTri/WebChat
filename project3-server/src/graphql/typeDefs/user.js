import {gql} from 'apollo-server-express'

export default gql`
    extend type Mutation {
        login(email: String!, password: String!): authUser!
    }
    extend type Mutation {
        signup(newUser: UserInput!) :authUser!
    }
    extend type Mutation {
        searchByName(name: String!): [User!]
    }
    extend type Mutation {
        getUserInfo(userId: String!): User!
    }
    input UserInput {
        email: String!
        name: String!
        password: String!
    }
    type User {
        id: ID!
        email: String!
        name: String!
        avatar_link: String
        phone: String
        gender: String

    }
    type authUser {
        user: User!,
        token: String!
    }

`