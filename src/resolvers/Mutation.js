import uuidv4 from 'uuid/v4';
const Mutation = {
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
};

export { Mutation as default };
