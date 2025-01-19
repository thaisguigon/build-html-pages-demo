import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import snakeCase from "lodash.snakecase";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { usePageHTMLCode } from "../hooks/usePageHTMLCode";
import { FormValues } from "../validation/types";
import styles from "./PageHTMLPreview.module.css";

export const PageHTMLPreview = () => {
  const {
    getValues,
    formState: { isValid },
  } = useFormContext<FormValues, "pageTitle">();
  const { pageHTMLCode } = usePageHTMLCode();

  const handleDownload = useCallback(() => {
    const pageTitle = getValues("pageTitle") || "untitled";
    const fileName = snakeCase(pageTitle);

    const element = document.createElement("a");
    const file = new Blob([pageHTMLCode], {
      type: "text/plain",
    });

    element.href = URL.createObjectURL(file);
    element.download = `${fileName}.html`;

    document.body.appendChild(element);

    element.click();
  }, [getValues, pageHTMLCode]);

  return (
    <section className={styles.root}>
      <header className={styles.header}>
        <h2>HTML preview</h2>
        <Button disabled={!isValid} onClick={handleDownload}>
          Download HTML file
        </Button>
      </header>

      <Card>
        <code>
          <pre>
            {pageHTMLCode.split("\n").map((line, index) => (
              <p key={`${line}-${index}`}>{line}</p>
            ))}
          </pre>
        </code>
      </Card>
    </section>
  );
};
