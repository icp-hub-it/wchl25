import { defineField } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

export const sectionFaq = defineField({
  name: "sectionFaq",
  type: "object",
  title: "FAQs",
  icon: HelpCircleIcon,
  fields: [
    {
      name: "title",
      type: "string",
    },
    defineField({
      name: "items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              type: "string",
            },
            {
              name: "answer",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
});
