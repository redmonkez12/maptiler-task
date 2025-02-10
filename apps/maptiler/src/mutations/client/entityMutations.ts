import { gql } from "@apollo/client";

export const CREATE_ENTITY_MUTATION = gql`
    mutation CreateEntity($name: String!, $status: String!) {
        createEntity(name: $name, status: $status) {
            id
            name
            status {
                id
                name
            }
        }
    }
`;

export const EDIT_ENTITY_MUTATION = gql`
    mutation EditEntity($id: ID!, $name: String!, $status: String!) {
        editEntity(id: $id, name: $name, status: $status) {  
            id
            name
            status {
                id
                name
            }
        }
    }
`;


export const DELETE_ENTITY_MUTATION = gql`
    mutation DeleteEntity($id: ID!) {
        deleteEntity(id: $id) {
            id
            name
        }
    }
`;
