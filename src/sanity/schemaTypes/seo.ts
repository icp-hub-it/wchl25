import { defineField } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";

export const seo = defineField({
  name: "seo",
  type: "object",
  title: "SEO Settings",
  icon: EarthGlobeIcon,
  group: "seo",
  fields: [
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      validation: (rule) => rule.warning().max(60),
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.warning().max(180),
    },
    {
      name: "metaImage",
      title: "Meta Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    },
    // {
    //   name: "keywords",
    //   title: "SEO Keywords",
    //   type: "array",
    //   of: [{ type: "string" }],
    // },
    // {
    //   name: "canonicalUrl",
    //   title: "Canonical URL",
    //   type: "url",
    // },
  ],
});
