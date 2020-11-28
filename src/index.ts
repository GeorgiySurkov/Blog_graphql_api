import { ApolloServer, gql } from "apollo-server";
import * as comments from './comments';
import * as posts from './posts';
import * as users from './users';

const typeDef = gql`
  type Query
  type Mutation
`;

const server = new ApolloServer({
  typeDefs: [typeDef, comments.typeDefs, posts.typeDefs, users.typeDefs],
  resolvers: [],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});