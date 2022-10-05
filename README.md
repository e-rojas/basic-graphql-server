# Basic Graphql Server

This is a basic graphql server that uses the graphql-yoga library. It is a simple server that has a single query and a single mutation. The query is a simple hello world query and the mutation is a simple hello world mutation.

## Getting Started

To get started, clone the repository and run `npm install` to install the dependencies. Then run `npm start` to start the server. The server will be running on port 4000.

## Prisma Setup with Docker

To setup the prisma server, run `npm install -g prisma` to install the prisma cli. Then run `prisma deploy` to deploy the prisma server. This will create a new prisma server and a new database. It will also create a new prisma.yml file. This file contains the endpoint for the prisma server. You will need to update the prisma endpoint in the prisma.yml file to match the endpoint that was created when you ran `prisma deploy`.

`docker-compose --env-file .env  up -d`

`sudo prisma1 deploy`

## Notes

1- Directives are used to modify the behavior of a field or fragment without affecting the underlying data. They are used to add additional functionality to the schema.
`@unique` is used to make a field unique.
`@relation` is used to create a relationship between two models.
`@default` is used to set a default value for a field.
`@createdAt` is used to set the date and time when a record was created.
`@updatedAt` is used to set the date and time when a record was updated.
