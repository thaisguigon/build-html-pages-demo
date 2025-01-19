"use client";

import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { MutationCreatePageArgs, Page } from "shared";
import {
  createPageMutation,
  MutationCreatePageResult,
} from "../graphql/createPageMutation";
import styles from "./PagesList.module.css";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

type PagesListProps = {
  pages: Page[];
};

export const PagesList = ({ pages }: PagesListProps) => {
  const router = useRouter();

  const [createPage] = useMutation<
    MutationCreatePageResult,
    MutationCreatePageArgs
  >(createPageMutation);

  const handleAddPage = useCallback(async () => {
    const createdPageData = await createPage({
      variables: {
        title: "",
      },
    });

    if (createdPageData.data?.createPage) {
      router.push(`/page/${createdPageData.data.createPage.id}`);
    }
  }, [createPage, router]);

  return (
    <div className={styles.root}>
      <h2>Pages list</h2>
      {pages?.map((page) => (
        <Link key={page.id} href={`/page/${page.id}`}>
          <Card>
            <h3>{page.title || "[Untitled page]"}</h3>
          </Card>
        </Link>
      ))}
      <Button className={styles.button} onClick={handleAddPage}>
        Add a page
      </Button>
    </div>
  );
};
