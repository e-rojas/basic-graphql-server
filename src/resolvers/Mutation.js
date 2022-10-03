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
  updateUser(parent, args, { db: { users } }, info) {
    const { id, data } = args;
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    if (typeof data.email === 'string') {
      const emailIsTaken = users.some((user) => user.email === data.email);
      if (emailIsTaken) {
        throw new Error('Email is taken');
      }
      user.email = data.email;
    }

    if (typeof data.name === 'string') {
      user.name = data.name;
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }

    return user;
  },
  createComment(
    parent,
    args,
    { db: { users, posts, comments }, pubsub },
    info
  ) {
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

    pubsub.publish(`comment ${args.comment.post}`, { comment });
    return comment;
  },
  updateComment(parent, args, { db: { comments } }, info) {
    const { id, data } = args;
    const comment = comments.find((comment) => comment.id === id);
    if (!comment) {
      throw new Error('Comment not found');
    }
    if (typeof data.text === 'string') {
      comment.text = data.text;
    }

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
  createPost(parent, args, { db: { users, posts }, pubsub }, info) {
    const userIsValid = users.some((user) => user.id === args.post.author);
    if (!userIsValid) {
      throw new Error('User is not valid!');
    }
    const post = {
      id: uuidv4(),
      ...args.post,
    };
    posts.push(post);
    if (post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: post,
        },
      });
    }
    return post;
  },
  updatePost(parent, args, { db: { posts }, pubsub }, info) {
    const { id, data } = args;
    const post = posts.find((post) => post.id === id);
    const originalPost = { ...post };

    if (!post) {
      throw new Error('Post not found');
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }

    if (typeof data.body === 'string') {
      post.body === data.body;
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published;

      if (originalPost.published && !post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: originalPost,
          },
        });
      } else if (!originalPost.published && post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post,
          },
        });
      }
    } else if (post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'UPDATED',
          data: post,
        },
      });
    }

    return post;
  },
};

export { Mutation as default };
