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
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: `Cards Section : ${title || "Untitled"}`,
        media: CopyIcon,
      };
    },
  },
});
