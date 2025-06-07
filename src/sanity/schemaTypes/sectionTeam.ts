import { defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const sectionTeam = defineField({
  name: "sectionTeam",
  type: "object",
  title: "Team",
  icon: UsersIcon,
  fields: [
    {
      name: "title",
      type: "string",
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
              name: "name",
              type: "string",
            },
            {
              name: "jobTitle",
              type: "string",
            },
            {
              name: "text",
              type: "blockContent",
            },
            {
              name: "picture",
              type: "image",
              fields: [{ name: "alt", type: "string" }],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      items: "items",
      title: "title",
    },
    prepare({ items, title }) {
      // Ensure `items` is an array before getting its length
      const count = Array.isArray(items) ? items.length : 0;

      // Ensure `title` is an array before using `map()`
      const titlePreview = Array.isArray(title)
        ? title.join(" — ")
        : "No content";

      return {
        title: `Team section (${count} members)`,
        subtitle: titlePreview,
        media: UsersIcon,
      };
    },
  },
});
