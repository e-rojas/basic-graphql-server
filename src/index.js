import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema) application schema
const typeDefs = `type Query {
    hello: String!
}`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query!';
    },
  },
};

// Create the GraphQL Yoga Server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

// Start the server
server.start(() => {
  console.log('The server is up!');
});
