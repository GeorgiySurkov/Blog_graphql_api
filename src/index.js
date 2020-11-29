const dotenv = require('dotenv');
dotenv.config();

const {ApolloServer, gql} = require("apollo-server");
const {GraphQLScalarType} = require('graphql');
const { Kind } = require('graphql/language');
require('./db');
const comments = require('./comments');
const posts = require('./posts');
const users = require('./users');

const typeDef = gql`
    scalar Date

    type Query
    type Mutation
`;

const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    }),
};

const server = new ApolloServer({
    typeDefs: [typeDef, users.typeDefs, posts.typeDefs, comments.typeDefs],
    resolvers: [resolvers, users.resolvers, posts.resolvers, comments.resolvers],
});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
