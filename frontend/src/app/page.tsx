import { PagesList } from "./components/PagesList";
import {
  getAllPagesQuery,
  GetAllPagesResult,
} from "./graphql/getAllPagesQuery";
import { graphqlRequest } from "./utils/graphqlRequest";

const Home = async () => {
  const data = await graphqlRequest<GetAllPagesResult>(getAllPagesQuery);

  return <PagesList pages={data.pages} />;
};

export default Home;
