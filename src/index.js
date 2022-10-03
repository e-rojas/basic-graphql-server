import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
import db from './db';
const resolvers = {
  Query: {
    comments: (parent, args, { db: { comments } }, info) => {
      return comments;
    },
    posts: (parent, args, { db: { posts } }, info) => {
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

    users(parent, args, { db: { users } }, info) {
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
    deletePost(parent, args, { db: { posts, comments } }, info) {
      const postIndex = posts.findIndex((post) => post.id === args.id);
      if (postIndex === -1) {
        throw new Error('Post not found');
      }
      const deletedPost = posts.splice(postIndex, 1)[0];
      comments = comments.filter((comment) => comment.post !== args.id);
      return deletedPost;
    },
    deleteUser(parent, args, { db: { users, posts, comments } }, info) {
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
    createComment(parent, args, { db: { users, posts, comments } }, info) {
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
    createUser(parent, args, { db: { users } }, info) {
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
    createPost(parent, args, { db: { users, posts } }, info) {
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
    author(parent, args, { db: { users } }, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, { db: { comments } }, info) {
      comments.filter((comment) => {
        comment.post === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, { db: { users } }, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post: (parent, args, { db: { posts } }, info) => {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
  User: {
    posts(parent, args, { db: { posts } }, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, { db: { comments } }, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },
};

// Create the GraphQL Yoga Server its
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
  },
});

// Start the server
server.start(() => {
  console.log('The server is up on port:4000!');
});
