import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { buildSchema, Resolver, Query } from 'type-graphql';

@Resolver()
class HelloReslover {
  @Query(() => String)
  async hello() {
    return 'Hello world';
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloReslover],
  });
  const apolloServer = new ApolloServer({ schema });
  const app = express();
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log('Server started on localhost:4000/graphql');
  });
};

main();
