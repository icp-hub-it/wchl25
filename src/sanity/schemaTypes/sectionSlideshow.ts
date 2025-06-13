import { defineField } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export const sectionSlideshow = defineField({
  name: "sectionSlideshow",
  type: "object",
  title: "Slideshow",
  icon: ImagesIcon,
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
    prepare() {
      return {
        title: `Slideshow Section`,
        media: ImagesIcon,
      };
    },
  },
});
