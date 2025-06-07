import { defineField } from "sanity";
import { TextIcon } from "@sanity/icons";

export const sectionHighlight = defineField({
  name: "sectionHighlight",
  type: "object",
  title: "Text Highlight",
  icon: TextIcon,
  fields: [
    {
      name: "title",
      type: "string",
      description: "Small title in monospaced font (optional).",
    },
    {
      name: "text",
      type: "blockContent",
    },
    defineField({
      name: "links",
      type: "array",
      description:
        "One or more buttons to redirect other urls, pages or files (optional).",
      of: [
        defineField({
          name: "link",
          type: "link",
        }),
      ],
    }),
    {
      name: "items",
      title: "Cards",
      description:
        "Animated cards to display relevant numeric data (optional).",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "number",
              type: "string",
            },
            {
              name: "text",
              type: "string",
            },
            {
              name: "subText",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      text: "text",
      title: "title",
    },
    prepare({ text, title }) {
      const plainText = text
        ? text[0]?.children?.map((child: any) => child.text).join(" ") || ""
        : "";
      const previewText =
        plainText.length > 100
          ? plainText.substring(0, 100) + "..."
          : plainText;
      return {
        title: "Text Highlight",
        subtitle: `${title ? title + " | " : ""}${previewText}` || "No content",
        media: TextIcon,
      };
    },
  },
});
