import { ObjectType, Field, ID, Resolver, Query, Arg } from 'type-graphql';
// import { User } from './userResolver';
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
    published: false,
    author: '2',
  },
];

@ObjectType()
export class Post {
  @Field((_type) => ID)
  readonly id: string;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field()
  published: boolean;

  @Field((_type) => ID)
  author: string;
}

@Resolver((_of) => Post)
class PostResolver {
  private _posts: Post[] = posts;
  @Query((_returns) => [Post])
  async posts(
    @Arg('published', { nullable: true }) published: boolean
  ): Promise<Post[]> {
    if (published === undefined) {
      return this._posts;
    }
    return this._posts.filter((post) => post.published === published);
  }

  @Query((_returns) => Post)
  async post(@Arg('id') id: string) {
    if (!id) {
      throw new Error('id is required');
    }
    return this._posts.find((post) => post.id === id);
  }
}

export default PostResolver;
