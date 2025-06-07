import { defineField } from "sanity";
import { CopyIcon } from "@sanity/icons";

export const sectionCards = defineField({
  name: "sectionCards",
  type: "object",
  title: "Cards",
  icon: CopyIcon,
  initialValue: {
    layout: "cards",
  },
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Small title in monospaced font (optional).",
    }),
    defineField({
      name: "headline",
      type: "string",
      description: "Main title for the section (recommended).",
    }),
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
            {
              name: "iconText",
              title: "Icon Text",
              type: "code",
              options: {
                language: "plaintext",
                languageAlternatives: [],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "text",
      type: "blockContent",
      description: "Optional introductive text.",
    }),
    defineField({
      name: "link",
      type: "link",
      description:
        "A button to redirect to another url, pages or file (optional).",
    }),
    {
      name: "layout",
      type: "string",
      description: "By defaults the itams are displayed as cards.",
      options: {
        list: ["cards", "rows"],
        layout: "radio",
      },
    },
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
