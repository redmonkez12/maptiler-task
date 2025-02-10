export const statusTypeDefsCustom = `
    directive @cacheControl(maxAge: Int) on FIELD_DEFINITION | OBJECT
    type Status @cacheControl(maxAge: 86400) {
        id: String!
        name: StatusEnum!
    }
`;
