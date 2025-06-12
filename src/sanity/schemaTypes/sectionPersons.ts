import { defineField } from "sanity";
import * as SanityIcon from "@sanity/icons";

export const sectionPersons = defineField({
  name: "sectionPersons",
  type: "object",
  title: "Persons",
  icon: SanityIcon.UsersIcon,
  initialValue: {
    layout: "cards",
  },
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
              name: "name",
              type: "string",
            },
            {
              name: "text",
              type: "blockContent",
            },
            {
              name: "image",
              type: "image",
            },
          ],
        },
      ],
    }),
  ],
});
