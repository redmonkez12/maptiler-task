export const entityTypeDefsMutations = `
    createEntity(name: String!, status: String!): Entity!
    deleteEntity(id: ID!): Entity!
    editEntity(id: ID!, name: String!, status: String!): Entity!
`;
