const Post = {
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
};

export { Post as default };
