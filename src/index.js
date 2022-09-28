import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema) application schema
const typeDefs = `type Query {
    me: User!
    post: Post!
}

type User {
    id: ID!
    name: String!
    email: String!
    age: Int
}

type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
}

`;

const resolvers = {
  Query: {
    me() {
      return {
        id: '123098',
        name: 'Mike',
        email: 'mike@gmail.com',
        age: 28,
      };
    },
    post() {
      return {
        id: '123098',
        title: 'GraphQL 101',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        published: false,
      };
    },
  },
};

// Resolvers
// const resolvers = {
//   Query: {
//    id() {
//     return 'abc123';
//    },
//     name() {
//         return 'Jerry'
//     },
//     age() {
//         return 27
//     },
//     employed() {
//         true
//     },
//     gpa(){
//         return 3.23
//     }
//   },
// };

// Create the GraphQL Yoga Server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

// Start the server
server.start(() => {
  console.log('The server is up!');
});
