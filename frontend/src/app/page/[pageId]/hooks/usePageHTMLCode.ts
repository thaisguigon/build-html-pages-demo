"use client";

import { format } from "prettier";
import prettierPluginHtml from "prettier/plugins/html";
import prettierPluginPostCss from "prettier/plugins/postcss";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormValues } from "../validation/types";

export const usePageHTMLCode = () => {
  const {
    formState: { isSubmitted, isValidating },
    getValues,
  } = useFormContext<FormValues>();
  const blocks = useWatch<FormValues, "blocks">({ name: "blocks" });

  const [formattedHTMLCode, setFormattedHTMLCode] = useState("");

  useEffect(() => {
    if (isSubmitted && isValidating) return;

    const pageTitle = getValues("pageTitle");
    const pageCss = getValues("pageCss");

    const stylesheet = new CSSStyleSheet();

    stylesheet.replaceSync(pageCss ?? "");

    const generatedHTMLCode = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <title>${pageTitle ?? ""}</title>
            <style>${Array.from(stylesheet.cssRules)
              .map((rule) => rule.cssText)
              .join("")}</style>
          </head>
          <body>
            ${
              blocks
                ?.map((block, index) =>
                  block.type === "image"
                    ? `<p id="block${index + 1}"><img src="${block.imageUrl ?? ""}" alt="" /></p>`
                    : `<h2 id="block${index + 1}">${block.titleText ?? ""}</h2>`
                )
                .join("") ?? ""
            }
          </body>
        </html>
    `;

    format(generatedHTMLCode, {
      parser: "html",
      plugins: [prettierPluginHtml, prettierPluginPostCss],
    }).then(setFormattedHTMLCode);
  }, [blocks, getValues, isSubmitted, isValidating]);

  return { pageHTMLCode: formattedHTMLCode };
};
