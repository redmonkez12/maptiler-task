import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';

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

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}