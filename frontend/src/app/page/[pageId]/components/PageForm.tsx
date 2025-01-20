"use client";

import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useCallback } from "react";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { getPageByIdQuery } from "../graphql/getPageByIdQuery";
import {
  MutationUpdatePageArgs,
  MutationUpdatePageResult,
  updatePageMutation,
} from "../graphql/updatePageMutation";
import { pageFormSchema } from "../validation/pageFormSchema";
import { FormValues } from "../validation/types";
import styles from "./PageForm.module.css";
import { PageHTMLPreview } from "./PageHTMLPreview";

type PageFormProps = {
  defaultValues: Partial<FormValues>;
  pageId: string;
};

export const PageForm = ({ defaultValues, pageId }: PageFormProps) => {
  const form = useForm<FormValues>({
    mode: "onBlur",
    resolver: zodResolver(pageFormSchema),
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "blocks",
  });
  const watchBlocks = form.watch("blocks");

  const handleAddBlock = useCallback(
    () =>
      append({
        type: "title",
        titleText: "",
      }),
    [append]
  );

  const [updatePage] = useMutation<
    MutationUpdatePageResult,
    MutationUpdatePageArgs
  >(updatePageMutation);

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (data) => {
      await updatePage({
        variables: {
          input: {
            id: pageId,
            title: data.pageTitle,
            styles: data.pageCss,
            blocks: data.blocks.map((block) => ({
              type: block.type,
              value: block.type === "image" ? block.imageUrl : block.titleText,
            })),
          },
        },
        refetchQueries: [getPageByIdQuery, "GetPageById"],
      });
      form.reset(data, { keepValues: true });
    },
    [form, pageId, updatePage]
  );

  const pageCssError = form.formState.errors?.pageCss;

  return (
    <FormProvider {...form}>
      <div className={styles.root}>
        <form
          className={styles.form}
          onSubmit={(event) => event.preventDefault()}
        >
          <section className={styles.formHeader}>
            <Link href="/">⬅️ Back to pages list</Link>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={!form.formState.isValid || !form.formState.isDirty}
            >
              {form.formState.isDirty ? "Save changes" : "Saved!"}
            </Button>
          </section>

          <section className={styles.pageSection}>
            <label htmlFor="page-title">
              <h2>Page title:</h2>
            </label>
            <input id="page-title" {...form.register("pageTitle")} />
          </section>

          <section className={styles.pageSection}>
            <label htmlFor="page-css">
              <h2>Page CSS:</h2>
            </label>
            <textarea
              id="page-css"
              className={pageCssError ? styles.errorField : ""}
              {...form.register("pageCss")}
            />
            {pageCssError && (
              <span className={styles.error}>{pageCssError.message}</span>
            )}
          </section>

          <Button className={styles.addBlockButton} onClick={handleAddBlock}>
            Add a block
          </Button>

          {fields.map((field, index) => {
            const imageUrlError =
              form.formState.errors?.blocks?.[index]?.imageUrl;

            return (
              <Card key={field.id} className={styles.block}>
                <header className={styles.blockHeader}>
                  <h2>Block #{index + 1}</h2>
                  <Button onClick={() => remove(index)} variant="outlined">
                    Delete
                  </Button>
                </header>

                <label>
                  Type:
                  <select {...form.register(`blocks.${index}.type`)}>
                    <option value="title">Title</option>
                    <option value="image">Image</option>
                  </select>
                </label>

                {watchBlocks[index].type === "title" && (
                  <label>
                    Title text:
                    <input {...form.register(`blocks.${index}.titleText`)} />
                  </label>
                )}

                {watchBlocks[index].type === "image" && (
                  <>
                    <label>
                      Image URL:
                      <input
                        className={imageUrlError ? styles.errorField : ""}
                        {...form.register(`blocks.${index}.imageUrl`)}
                      />
                    </label>
                    {imageUrlError && (
                      <span className={styles.error}>
                        {imageUrlError.message}
                      </span>
                    )}
                  </>
                )}
              </Card>
            );
          })}
        </form>

        <PageHTMLPreview />
      </div>
    </FormProvider>
  );
};
