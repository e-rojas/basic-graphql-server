import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema) application schema
// array of scalar types
const typeDefs = `type Query {
    users(query:String): [User!]!
    posts(query:String): [Post!]!
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
    author: User!
}

`;
const posts = [
  {
    id: '1',
    title: 'GraphQL 101',
    body: 'this is about graphQL 101',
    author: '1',
  },
  {
    id: '2',
    title: 'GraphQL 201',
    body: 'this is about graphQL 201',
    author: '1',
  },
  {
    id: '3',
    title: 'Programming Music',
    body: 'this is about programming music',
    author: '2',
  },
];
const users = [
  {
    id: '1',
    name: 'Albert',
    email: 'albert@mail.com',
    age: 27,
  },
  {
    id: '2',
    name: 'Sarah',
    email: 'sarah@mail.com',
    age: 25,
  },
  {
    id: '3',
    name: 'Mike',
    email: 'mike@gmail.com',
    age: null,
  },
];
const resolvers = {
  Query: {
    posts: (parent, args, ctx, info) => {
      if (!args.query) {
        return posts;
      }
      //  scaler types requested from the client
      return posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    },

    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
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
  // custom type resolver for Post
  Post: {
    author: (parent, args, ctx, info) => {
      return users.find((user) => {
        return user.id === parent.author;
      });
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
