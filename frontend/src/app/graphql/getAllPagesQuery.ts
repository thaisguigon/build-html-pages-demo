import { gql } from "@apollo/client";
import { Query } from "shared";

export const getAllPagesQuery = gql`
  query GetAllPages {
    pages {
      id
      title
    }
  }
`;

export type GetAllPagesResult = Pick<Query, "__typename" | "pages">;
