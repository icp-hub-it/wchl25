// ./src/sanity/schemaTypes/post.ts
import { defineField, defineType } from "sanity";
import { sectionText } from "./sectionText";
import { sectionSlideshow } from "./sectionSlideshow";

export const homepageType = defineType({
  name: "homepage",
  type: "document",
  fields: [
    {
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    },
    defineField({
      name: "sections",
      type: "array",
      of: [sectionText, sectionSlideshow],
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return { ...selection, title: "Homepage" };
    },
  },
});
