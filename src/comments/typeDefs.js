const { gql } = require('apollo-server');

const typeDefs = gql`
    union Repliable = Comment | Post
    
    type Comment {
        id: ID!
        post: Post!
        replyTo: Repliable!
        author: User!
        text: String!
        dateCreated: Date!
        replies: [Comment!]!
    }

    input CommentCreateInput {
        postId: ID!
        replyToComment: ID
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
        createComment(userId: ID!, comment: CommentCreateInput!): Comment!
        updateComment(userId: ID!, comment: CommentUpdateInput!): Comment!
        deleteComment(userId: ID!, id: ID!): Comment!
    }
`

module.exports = {
    typeDefs
}