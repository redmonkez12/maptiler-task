import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';

import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schema";
import { createStatusLoader, StatusLoader } from '@/services/status';

export interface GraphQLContext {
  statusLoader: StatusLoader;
}

async function getContext(): Promise<GraphQLContext> {
  return {
    statusLoader: createStatusLoader(),
  };
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => getContext()
});

export { handler as GET, handler as POST };
