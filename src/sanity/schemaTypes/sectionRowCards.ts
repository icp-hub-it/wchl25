import { defineField } from "sanity";
import { CopyIcon } from "@sanity/icons";

export const sectionRowCards = defineField({
  name: "sectionRowCards",
  type: "object",
  title: "Row Cards",
  icon: CopyIcon,
  fields: [
    {
      name: "title",
      type: "string",
    },
    defineField({
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
            },
            {
              name: "text",
              type: "blockContent",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      headline: "headline",
      layout: "layout",
    },
    prepare({ headline, layout }) {
      return {
        title: `Cards Section (${layout === "cards" ? "Default" : "Rows"} layout)`,
        subtitle: headline || "",
        media: CopyIcon,
      };
    },
  },
});
