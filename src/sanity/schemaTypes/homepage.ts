import { defineField, defineType } from "sanity";
import { sectionText } from "./sectionText";
import { sectionSlideshow } from "./sectionSlideshow";
import { sectionTimeline } from "./sectionTimeline";
import { sectionRowCards } from "./sectionRowCards";
import { sectionSteps } from "./sectionSteps";
import { sectionPersons } from "./sectionPersons";
import { sectionWorkshops } from "./sectionWorkshops";

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
      of: [
        sectionPersons,
        sectionRowCards,
        sectionSlideshow,
        sectionSteps,
        sectionText,
        sectionTimeline,
        sectionTimeline,
        sectionWorkshops,
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
