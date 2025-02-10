import { getClient } from "@/utils/apolloClient";
import { gql } from "@apollo/client";
import { StatusType } from "@prisma/client";

export interface StatusesResponse {
    allStatuses: {
        id: string;
        name: StatusType;
    }[];
}

export async function getStatuses() {
    const { data }: { data: StatusesResponse } = await getClient().query({
        query: gql`
         query {
            allStatuses {
                id
                name
            }
        }
        `
    });

    return data?.allStatuses || [];
}