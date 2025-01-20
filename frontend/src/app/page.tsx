"use client";

import { useQuery } from "@apollo/client";
import { PagesList } from "./components/PagesList";
import {
  getAllPagesQuery,
  GetAllPagesResult,
} from "./graphql/getAllPagesQuery";

const Home = () => {
  const { data, loading } = useQuery<GetAllPagesResult>(getAllPagesQuery);

  if (loading || !data) return <p>Loading...</p>;

  return <PagesList pages={data.pages} />;
};

export default Home;
