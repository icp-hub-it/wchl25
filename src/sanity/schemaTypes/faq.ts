import { defineField, defineType } from "sanity";

import { sectionFaq } from "./sectionFaq";

export const faqType = defineType({
  name: "faq",
  type: "document",
  fields: [
    {
      name: "ctaText",
      type: "string",
    },
    {
      name: "ctaUrl",
      type: "url",
    },
    {
      name: "ctaText",
      type: "string",
    },
    {
      name: "countdownDate",
      type: "datetime",
    },
    {
      name: "countdownText",
      type: "string",
    },
    defineField({
      name: "sections",
      type: "array",
      of: [sectionFaq],
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return { ...selection, title: "FAQ" };
    },
  },
});
