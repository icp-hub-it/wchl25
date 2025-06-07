// ./src/sanity/schemaTypes/post.ts
import { defineField, defineType } from "sanity";
import { seo } from "./seo";
import { EarthGlobeIcon } from "@sanity/icons";

export const postType = defineType({
  name: "post",
  type: "document",
  initialValue: {
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
    {
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    },
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),

    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
    defineField({
      name: "link",
      type: "link",
    }),
    seo,
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
