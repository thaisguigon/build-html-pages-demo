import { DocumentNode } from "graphql";

export const graphqlRequest = async <
  TData,
  TVariables = Record<string, unknown>,
>(
  query: DocumentNode,
  variables?: TVariables
): Promise<TData> => {
  const { data } = await fetch(`${process.env.API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query.loc?.source.body,
      variables,
    }),
  }).then((res) => res.json());

  return data;
};
