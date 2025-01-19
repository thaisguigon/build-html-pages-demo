import { gql } from "@apollo/client";
import { Query } from "shared";

export const getPageByIdQuery = gql`
  query GetPageById($id: ID!) {
    page(id: $id) {
      id
      title
      styles
      blocks {
        id
        type
        value
      }
    }
  }
`;

export type GetPageByIdQueryResult = Pick<Query, "__typename" | "page">;
