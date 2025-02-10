import { GraphQLContext } from "@/app/api/graphql/route";
import { getAllStatuses } from "@/services/status";

export const statusQueries = {
	async allStatuses(_: any) {
		return getAllStatuses();
	},
};

export const entityStatusQueries = {
	async status(entity: { statusId: string }, _: any, { statusLoader }: GraphQLContext) {
		return statusLoader.load(entity.statusId);
	},
};
