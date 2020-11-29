const {gql} = require('apollo-server');


const typeDefs = gql`
    type Post {
        id: ID!
        author: User!
        title: String!
        text: String!
        dateCreated: Date!
        replies: [Comment!]!
    }

    input PostCreateInput {
        title: String!
        text: String!
    }

    input PostUpdateInput {
        id: ID!
        title: String
        text: String
    }

    extend type Query {
        getPost(id: ID!): Post
    }

    extend type Mutation {
        createPost(userId: ID!, post: PostCreateInput!): Post!
        updatePost(userId: ID!, post: PostUpdateInput!): Post!
        deletePost(userId: ID!, id: ID!): Post!
    }
`

module.exports = {
    typeDefs
};
