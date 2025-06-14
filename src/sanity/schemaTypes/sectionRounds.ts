import { defineField } from "sanity";
import * as SanityIcon from "@sanity/icons";

export const sectionRounds = defineField({
  name: "sectionRounds",
  type: "object",
  title: "Rounds",
  icon: SanityIcon.RocketIcon,
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "description",
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
              name: "title",
              type: "string",
            },
            {
              name: "description",
              type: "string",
            },
            {
              name: "advancement",
              type: "string",
            },
            {
              name: "prize",
              type: "string",
            },
            {
              name: "month",
              type: "string",
            },
            {
              name: "period",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
});
