import { defineField } from "sanity";
import * as SanityIcon from "@sanity/icons";

export const sectionPersons = defineField({
  name: "sectionPersons",
  type: "object",
  title: "Persons",
  icon: SanityIcon.UsersIcon,
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
              name: "role",
              type: "string",
            },
            {
              name: "company",
              type: "string",
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
