import { GraphQLError } from "graphql";

export function internalServerError() {
	return new GraphQLError("Internal server error", {
		extensions: { code: "INTERNAL_SERVER_ERROR" },
	});
}

export function notFound(message: string) {
    return new GraphQLError(message, {
		extensions: { code: "NOT_FOUND" },
	});
}

export function badRequest(message: string) {
    return new GraphQLError(message, {
		extensions: { code: "BAD_REQUEST" },
	});
}
