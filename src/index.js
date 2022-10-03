import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
// Type definitions (schema) application schema
// array of scalar types
const typeDefs = `type Query {
    users(query:String): [User!]!
    posts(query:String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
}

type Mutation {
    createUser(data: CreateUserInput):User!
    deleteUser(id:ID!):User!
    createPost(post: createPostInput):Post!
    createComment(comment: createCommentInput):Comment!
}

input CreateUserInput {
  name: String!,
  email: String!,
  age: Int
}

input createPostInput {
  title: String!,
  body: String!,
  published: Boolean!,
  author: ID!
}

input createCommentInput {
  text: String!,
  author: ID!,
  post: ID!
}

type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
}

type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
}

type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
}

`;
// comments
let comments = [
  {
    id: '102',
    text: 'This worked well for me. Thanks!',
    author: '3',
    post: '1',
  },
  {
    id: '103',
    text: 'Glad you enjoyed it.',
    author: '1',
    post: '2',
  },
  {
    id: '104',
    text: 'This did no work.',
    author: '2',
    post: '3',
  },
  {
    id: '105',
    text: 'Nevermind. I got it to work.',
    author: '1',
    post: '2',
  },
];
// posts
let posts = [
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
let users = [
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
    comments: (parent, args, ctx, info) => {
      return comments;
    },
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
  Mutation: {
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex((user) => user.id === args.id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const deletedUsers = users.splice(userIndex, 1)[0];
      posts = posts.filter((post) => {
        const match = post.author === args.id;
        if (match) {
          comments = comments.filter((comment) => comment.post !== post.id);
        }
        comments = comments.filter((comment) => comment.author !== args.id);
        return !match;
      });
      return deletedUsers;
    },
    createComment(parent, args, ctx, info) {
      const userIsValid = users.some((user) => user.id === args.comment.author);
      const postExist = posts.some((post) => post.id === args.comment.post);
      if (!userIsValid || !postExist) {
        throw new Error('Invalid user or Post id!');
      }
      const comment = {
        id: uuidv4(),
        ...args.comment,
      };

      comments.push(comment);
      return comment;
    },
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.data.email);
      if (emailTaken) {
        throw new Error('Email taken.');
      }
      const user = {
        id: uuidv4(),
        ...args.data,
      };
      users.push(user);
      return user;
    },
    createPost(parent, args, ctx, info) {
      const userIsValid = users.some((user) => user.id === args.post.author);
      if (!userIsValid) {
        throw new Error('User is not valid!');
      }
      const post = {
        id: uuidv4(),
        ...args.post,
      };
      posts.push(post);
      return post;
    },
  },
  // custom type resolver for Post
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      comments.filter((comment) => {
        comment.post === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post: (parent, args, ctx, info) => {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
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
  console.log('The server is up on port:4000!');
});
