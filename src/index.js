import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema) application schema
// array of scalar types
const typeDefs = `type Query {
    greeting(name: String): String!
    add(numbers:[Float!]!): Float!
    me: User!
    post: Post!
    grades: [Int!]!
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
    grades(parent, args, ctx, info) {
      return [60, 70, 80];
    },
    greeting(parent, args, ctx, info) {
      // parent is the object that contains the result of the previous operation, args is the arguments passed to the function, ctx is the context object, info is the information about the query
      return `Hello ${args.name}`;
    },
    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      }
      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
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
