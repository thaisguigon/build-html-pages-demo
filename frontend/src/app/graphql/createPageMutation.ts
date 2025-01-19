import { gql } from "@apollo/client";
import { Mutation } from "shared";

export const createPageMutation = gql`
  mutation CreatePage($title: String!) {
    createPage(title: $title) {
      id
      title
    }
  }
`;

export type { MutationCreatePageArgs } from "shared";

export type MutationCreatePageResult = Pick<
  Mutation,
  "__typename" | "createPage"
>;
