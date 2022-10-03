const Query = {
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
};

export { Query as default };
