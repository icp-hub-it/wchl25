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
});
