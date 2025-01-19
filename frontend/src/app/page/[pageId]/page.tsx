import { graphqlRequest } from "@/app/utils/graphqlRequest";
import { PageForm } from "./components/PageForm";
import {
  getPageByIdQuery,
  GetPageByIdQueryResult,
} from "./graphql/getPageByIdQuery";
import { FormValues } from "./validation/types";

type PageParams = {
  pageId: string;
};

const Page = async ({ params }: { params: Promise<PageParams> }) => {
  const { pageId } = await params;

  const data = await graphqlRequest<GetPageByIdQueryResult>(getPageByIdQuery, {
    id: pageId,
  });
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
