import users from '../data/users';
import { ObjectType, Field, ID, Int, Resolver, Query, Arg } from 'type-graphql';

@ObjectType()
export class User {
  @Field((_type) => ID)
  readonly id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field((_type) => Int)
  age: number;

  @Field()
  isActive: boolean;
}

@Resolver()
class UserResolver {
  private _users: User[] = users;

  @Query((_returns) => [User])
  async users() {
    return await this._users;
  }

  @Query((_returns) => User)
  async user(@Arg('id') id: string) {
    if (!id) {
      throw new Error('id is required');
    }
    return this._users.find((user) => user.id === id);
  }
}

export { UserResolver };
