import {gql} from 'apollo-server';


export const typeDefs = gql`
    type Post {
        id: ID!
        author: User!
        title: String!
        text: String!
        dateCreated: Int!
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
        createPost(post: PostCreateInput!) Post!
        updatePost(post: PostUpdateInput!) Post!
        deletePost(id: ID!) Post!
    }
`