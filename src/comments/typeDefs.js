const { gql } = require('apollo-server');

const typeDefs = gql`
    type Comment {
        id: ID!
        post: Post!
        replyTo: Comment
        author: User!
        text: String!
        dateCreated: Int!
        replies: [Comment]!
    }

    input CommentCreateInput {
        post: ID!
        replyTo: ID
        text: String!
    }

    input CommentUpdateInput {
        id: ID!
        text: String!
    }

    extend type Query {
        getComment(id: ID!): Comment
    }

    extend type Mutation {
        createComment(comment: CommentCreateInput!): Comment!
        updateComment(comment: CommentUpdateInput!): Comment!
        deleteComment(id: ID!): Comment!
    }
`

module.exports = {
    typeDefs
}