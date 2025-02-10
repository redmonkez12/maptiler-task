export const entityTypeDefsCustom = `
    type EntityPagination {
        entities: [Entity]!
        count: Int!
    }

    directive @cacheControl(maxAge: Int) on FIELD_DEFINITION | OBJECT
    type Entity @cacheControl(maxAge: 86400) {
        id: String!
        name: String!
        status: Status
    }
`;
