import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AuthResolver } from "../graphql/resolvers/AuthResolver";
import { UserResolver } from "../graphql/resolvers/UserResolver";
import { info } from "../utils/chalk";
import { GRAPHQL, GRAPHQL_PLAYGROUND, PORT } from "./settings";

export const getApollo = async () => {
    if (!GRAPHQL) throw new Error('error');
    const schema = await buildSchema({
        resolvers: [UserResolver, AuthResolver] // add this
    })
    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
    }) as any;
    await server.start()
    if (GRAPHQL_PLAYGROUND) {
        info('🚀 PLAYGROUND available on http://localhost:4000/graphql')
    }
    info("🚀 Apollo server on http://localhost:" + PORT + '/graphql')
    info("🚀 Explore at https://studio.apollographql.com/sandbox")
    return server
}