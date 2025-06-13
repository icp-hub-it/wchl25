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
      type: "blockContent",
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
              name: "text",
              type: "blockContent",
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
              name: "deadline",
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
});
