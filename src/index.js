const dotenv = require('dotenv');
dotenv.config();
const { ApolloServer, gql } = require("apollo-server");
require('./db');
const comments = require('./comments');
const posts = require('./posts');
const users = require('./users');

const typeDef = gql`
  type Query
  type Mutation
`;

const server = new ApolloServer({
  typeDefs: [typeDef, comments.typeDefs, posts.typeDefs, users.typeDefs],
  resolvers: [users.resolvers],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
