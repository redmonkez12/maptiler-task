import { entityQueries } from "@/graphql/entities/queries";
import { entityMutations } from "@/graphql/entities/mutations";
import { entityStatusQueries, statusQueries } from "./status/queries";

export const resolvers = {
	Entity: {
        ...entityStatusQueries,
    },
	Query: {
		...entityQueries,
		...statusQueries,
	},
	Mutation: {
		...entityMutations,
	},
};
