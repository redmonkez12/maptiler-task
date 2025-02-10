export const entityTypeDefsQueries = `
    allEntities(limit: Int!, offset: Int!): EntityPagination!
    entityById(id: ID!): Entity!
`;
