import { format } from "prettier";
import prettierPluginPostCss from "prettier/plugins/postcss";
import { z } from "zod";

export const pageFormSchema = z.object({
  pageTitle: z.string(),
  pageCss: z.string().refine(
    async (value) => {
      try {
        await format(value, {
          parser: "css",
          plugins: [prettierPluginPostCss],
        });
      } catch {
        return false;
      }

      return true;
    },
    { message: "Invalid CSS" }
  ),
  blocks: z.array(
    z
      .object({
        type: z.enum(["title", "image"]),
        titleText: z.string().optional(),
        imageUrl: z.string().optional(),
      })
      .and(
        z.discriminatedUnion("type", [
          z.object({
            type: z.literal("title"),
            titleText: z.string(),
          }),
          z.object({
            type: z.literal("image"),
            imageUrl: z.string().url(),
          }),
        ])
      )
  ),
});
