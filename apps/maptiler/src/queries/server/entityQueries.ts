import { getClient } from "@/utils/apolloClient";
import { gql } from "@apollo/client";

export interface Entity {
	id: string;
	name: string;
	status: {
		id: string;
		name: string;
	};
}

export interface EntitiesResponse {
	allEntities: {
		entities: Entity[];
		count: number;
	};
}

export interface EntityResponse {
	entityById: Entity;
}

export async function getEntities(limit: number, offset: number) {
	const { data }: { data: EntitiesResponse } = await getClient().query({
		query: gql`
            query AllEntities($limit: Int!, $offset: Int!) {
                allEntities(limit: $limit, offset: $offset) {
                    entities {
                        id
                        name
                        status {
                            id
                            name
                        }
                    }
                    count
                }
            }
        `,
		variables: { limit, offset },
	});

	return data?.allEntities || { entities: [], count: 0 };
}

export async function getEntity(id: string) {
    try {
        const { data }: { data: EntityResponse } = await getClient().query({
            query: gql`
                query EntityById($id: ID!) {
                    entityById(id: $id) {
                        id
                        name
                        status {
                            id
                            name
                        }
                    }
                }
            `,
            variables: { id },
        });

    
        return data?.entityById;
    } catch (e: any) {
        if (e.graphQLErrors.length > 0) {
            throw new Error(e.graphQLErrors.map((err: any) => err.message).join(", "));
        }
    }
}