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
import { sectionFaq } from "./sectionFaq";
import { sectionPartners } from "./sectionPartners";
import { sectionRounds } from "./sectionRounds";

export const homepageType = defineType({
  name: "homepage",
  type: "document",
  fields: [
    {
      name: "faqUrl",
      type: "url",
    },
    {
      name: "ctaText",
      type: "string",
    },
    {
      name: "ctaUrl",
      type: "url",
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
      of: [
        sectionFaq,
        sectionHubMap,
        sectionPartners,
        sectionPersons,
        sectionRounds,
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
