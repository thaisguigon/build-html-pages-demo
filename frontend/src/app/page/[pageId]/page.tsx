"use client";

import { useQuery } from "@apollo/client";
import { use } from "react";
import { PageForm } from "./components/PageForm";
import {
  getPageByIdQuery,
  GetPageByIdQueryResult,
} from "./graphql/getPageByIdQuery";
import { FormValues } from "./validation/types";

type PageParams = {
  pageId: string;
};

const Page = ({ params }: { params: Promise<PageParams> }) => {
  const { pageId } = use(params);

  const { data, loading } = useQuery<GetPageByIdQueryResult>(getPageByIdQuery, {
    variables: {
      id: pageId,
    },
  });

  if (loading || !data) return <p>Loading...</p>;

  const pageData = data?.page;

  const defaultValues: Partial<FormValues> = {
    pageTitle: pageData?.title ?? "",
    pageCss: pageData?.styles ?? "",
    blocks: pageData?.blocks.map((block) =>
      block.type === "image"
        ? {
            type: "image",
            imageUrl: block.value,
          }
        : {
            type: "title",
            titleText: block.value,
          }
    ),
  };

  return <PageForm defaultValues={defaultValues} pageId={pageId} />;
};

export default Page;
