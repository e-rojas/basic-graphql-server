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

const db = {
  users,
  posts,
  comments,
};

export { db as default };
