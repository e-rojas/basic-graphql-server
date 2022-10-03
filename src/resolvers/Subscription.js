const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;
      setInterval(() => {
        count++;
        pubsub.publish('count', {
          count,
        });
      }, 2000);
      return pubsub.asyncIterator('count'); // channel name
    },
  },
  comment: {
    subscribe(parent, { postId }, { db: { posts, comments }, pubsub }, info) {
      const post = posts.find((post) => post.id === postId && post.published);
      if (!post) {
        throw new Error('Post not found');
      }

      return pubsub.asyncIterator(`comment ${postId}`);
    },
  },
  post: {
    subscribe(parent, args, { db: { posts }, pubsub }, info) {
      return pubsub.asyncIterator('post');
    },
  },
};

export { Subscription as default };
