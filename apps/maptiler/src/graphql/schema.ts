import gql from "graphql-tag";

import { entityTypeDefsCustom } from "@/graphql/entities/custom.gql";
import { entityTypeDefsQueries } from "@/graphql/entities/queries.gql";
import { entityTypeDefsMutations } from "@/graphql/entities/mutations.gql";
import { statusTypeDefsQueries } from "./status/queries.gql";
import { statusTypeDefsCustom } from "./status/custom.gql";
import { enumsTypeDefsCustom } from "./enums";

export const typeDefs = gql`
 ${enumsTypeDefsCustom}
 ${entityTypeDefsCustom}
 ${statusTypeDefsCustom}
 type Query {
    ${entityTypeDefsQueries}
    ${statusTypeDefsQueries}
 }
 type Mutation {
    ${entityTypeDefsMutations}
 }
`;
