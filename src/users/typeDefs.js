const { gql } = require('apollo-server');


const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        posts: [Post!]!
    }

    input UserCreateInput {
        firstName: String!
        lastName: String!
        email: String!
    }

    input UserUpdateInput {
        id: ID!
        firstName: String
        lastName: String
        email: String
    }

    extend type Query {
        getUser(id: ID!): User
    }

    extend type Mutation {
        createUser(user: UserCreateInput!): User!
        updateUser(user: UserUpdateInput!): User!
        deleteUser(id: ID!): User!
    }
`

module.exports = {
    typeDefs
}