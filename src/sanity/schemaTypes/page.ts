import { defineField, defineType } from "sanity";
import { sectionFaq } from "./sectionFaq";
import React from "react";
import { seo } from "./seo";
import { EarthGlobeIcon } from "@sanity/icons";

export const pageType = defineType({
  name: "page",
  type: "document",
  initialValue: {
    template: "default",
    language: "en",
  },
  groups: [{ name: "seo", title: "SEO", icon: EarthGlobeIcon }],
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "sections",
      type: "array",
      of: [sectionFaq],
      hidden: ({ parent }) => parent?.template !== "default",
    }),
    seo,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      // Render flagEmoji directly as media using a text-based representation
      return {
        title,
        subtitle: "",
        media: () =>
          React.createElement("span", {
            style: { fontSize: "1rem", display: "block" },
          }),
      };
    },
  },
});
