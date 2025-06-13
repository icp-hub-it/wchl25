import { defineField } from "sanity";
import { CopyIcon } from "@sanity/icons";

export const sectionSlideshow = defineField({
  name: "sectionSlideshow",
  type: "object",
  title: "Slideshow",
  icon: CopyIcon,
  fields: [
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
