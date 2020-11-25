const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
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

    type Query {
        getUser(id: ID!): User
        getPost(id: ID!): Post
        getComment(id: ID!): Comment
    }

    type Mutation {
        createUser(user: UserCreateInput!) User!
        updateUser(user: UserUpdateInput!) User!
        deleteUser(id: ID!) User!

        createPost(post: PostCreateInput!) Post!
        updatePost(post: PostUpdateInput!) Post!
        deletePost(id: ID!) Post!

        createComment(comment: CommentCreateInput!) Comment!
        updateComment(comment: CommentUpdateInput!) Comment!
        deleteComment(id: ID!) Comment!
    }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
