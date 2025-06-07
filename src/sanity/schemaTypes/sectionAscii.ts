import { defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const sectionAscii = defineField({
  name: "sectionAscii",
  type: "object",
  title: "ASCII + Text",
  icon: ImageIcon,
  initialValue: {
    background: false,
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
    {
      name: "text",
      type: "blockContent",
    },
    {
      name: "ascii",
      title: "ASCII Image",
      type: "code",
      options: {
        language: "plaintext",
        languageAlternatives: [],
      },
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
      name: "background",
      title: "Darker background",
      type: "boolean",
    },
  ],
  preview: {
    select: {
      headline: "headline",
    },
    prepare({ headline }) {
      return {
        title: `ASCII Section`,
        subtitle: headline || "",
        media: ImageIcon,
      };
    },
  },
});
