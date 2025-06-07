import { defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const sectionContact = defineField({
  name: "sectionContact",
  type: "object",
  title: "Contact",
  icon: EnvelopeIcon,
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
    }),
  ],
  preview: {
    select: {
      text: "text",
      title: "headline",
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
        title: "Contact",
        subtitle: `${title ? title + " | " : ""}${previewText}` || "No content",
        media: EnvelopeIcon,
      };
    },
  },
});
