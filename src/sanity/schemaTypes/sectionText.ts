import { defineField } from "sanity";
import { BlockContentIcon } from "@sanity/icons";

export const sectionText = defineField({
  name: "sectionText",
  type: "object",
  title: "Basic Text",
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      body: "body", // Select the body content
    },
    prepare({ body }) {
      const plainText = body
        ? body[0]?.children?.map((child: any) => child.text).join(" ") || ""
        : "";
      const previewText =
        plainText.length > 100
          ? plainText.substring(0, 100) + "..."
          : plainText;
      return {
        title: "Basic Text",
        subtitle: previewText || "No content",
        media: BlockContentIcon, // Display text icon
      };
    },
  },
});
