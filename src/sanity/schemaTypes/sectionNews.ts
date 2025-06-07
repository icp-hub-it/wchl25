import { defineField } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";

export const sectionNews = defineField({
  name: "sectionNews",
  type: "object",
  title: "Featured News",
  icon: EarthGlobeIcon,
  fields: [
    {
      name: "headline",
      type: "string",
    },
    defineField({
      name: "link",
      type: "link",
    }),
    {
      name: "news",
      type: "array",
      of: [
        {
          name: "post",
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "headline",
    },
    prepare({ title }) {
      return {
        title: "News Section",
        subtitle: `${title}` || "No content",
        media: EarthGlobeIcon,
      };
    },
  },
});
