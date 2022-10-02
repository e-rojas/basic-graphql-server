import { User } from 'src/resolvers/userResolver';

const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'jon@mail.com',
    age: 25,
    isActive: true,
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@mail.com',
    age: 25,
    isActive: true,
  },
];

export default users;
