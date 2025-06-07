import { defineField } from "sanity";
import { StackIcon } from "@sanity/icons";

export const sectionRows = defineField({
  name: "sectionRows",
  type: "object",
  title: "Rows",
  icon: StackIcon,
  fields: [
    {
      name: "title",
      description: "Repeated text",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: "items",
      title: "Rows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "headline",
              type: "string",
            },
            {
              name: "text",
              type: "blockContent",
            },
            defineField({
              name: "link",
              type: "link",
              description:
                "A button to redirect to another url, pages or file (optional).",
            }),
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      rows: "items",
      title: "title",
    },
    prepare({ rows, title }) {
      // Ensure `rows` is an array before getting its length
      const rowCount = Array.isArray(rows) ? rows.length : 0;

      // Ensure `title` is an array before using `map()`
      const titlePreview = Array.isArray(title)
        ? title.join(" — ")
        : "No content";

      return {
        title: `${rowCount} Rows`,
        subtitle: titlePreview,
        media: StackIcon,
      };
    },
  },
});
