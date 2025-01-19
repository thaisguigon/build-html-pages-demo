import { gql } from "@apollo/client";
import { Mutation } from "shared";

export const updatePageMutation = gql`
  mutation UpdatePage($input: UpdatePageInput!) {
    updatePage(input: $input) {
      title
      styles
      blocks {
        type
        value
      }
    }
  }
`;

export type { MutationUpdatePageArgs } from "shared";

export type MutationUpdatePageResult = Pick<
  Mutation,
  "__typename" | "updatePage"
>;
