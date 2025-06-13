import { defineField, defineType } from "sanity";
import { sectionText } from "./sectionText";
import { sectionSlideshow } from "./sectionSlideshow";
import { sectionTimeline } from "./sectionTimeline";
import { sectionRowCards } from "./sectionRowCards";
import { sectionSteps } from "./sectionSteps";
import { sectionPersons } from "./sectionPersons";
import { sectionWorkshops } from "./sectionWorkshops";
import { sectionHubMap } from "./sectionHubMap";
import { sectionScrollText } from "./sectionScrollText";

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
        sectionHubMap,
        sectionPersons,
        sectionRowCards,
        sectionScrollText,
        sectionSlideshow,
        sectionSteps,
        sectionText,
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
