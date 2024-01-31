import { gql } from '@apollo/client';

export const DELETE_CLIENTS = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;
