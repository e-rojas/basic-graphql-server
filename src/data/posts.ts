import { Post } from 'src/resolvers/postsResolver';

const posts: Post[] = [
  {
    id: '1',
    title: 'GraphQL 101',
    body: 'this is about graphQL 101',
    published: true,
    author: '1',
  },
  {
    id: '2',
    title: 'GraphQL 201',
    body: 'this is about graphQL 201',
    published: true,
    author: '1',
  },
  {
    id: '3',
    title: 'GraphQL 301',
    body: 'this is about graphQL 301',
    published: true,
    author: '2',
  },
];

export default posts;
