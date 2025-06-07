// ./src/sanity/schemaTypes/post.ts
import { defineField, defineType } from "sanity";
import { sectionText } from "./sectionText";
import { sectionCards } from "./sectionCards";
import { sectionAscii } from "./sectionAscii";
import { sectionHighlight } from "./sectionHighlight";
import { sectionRows } from "./sectionRows";
import { sectionTeam } from "./sectionTeam";
import { sectionContact } from "./sectionContact";
import { sectionNews } from "./sectionNews";

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
    {
      name: "heroSection",
      type: "object",
      fields: [
        {
          name: "headline",
          type: "string",
        },
        {
          name: "subHeadline",
          type: "string",
        },
        defineField({
          name: "link",
          type: "link",
        }),
        {
          name: "ascii",
          type: "code",
        },
      ],
    },
    defineField({
      name: "sections",
      type: "array",
      of: [
        sectionText,
        sectionCards,
        sectionAscii,
        sectionHighlight,
        sectionRows,
        sectionTeam,
        sectionContact,
        sectionNews,
      ],
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
