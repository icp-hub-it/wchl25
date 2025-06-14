import { defineField } from "sanity";
import * as SanityIcon from "@sanity/icons";

export const sectionPartners = defineField({
  name: "sectionPartners",
  type: "object",
  title: "Partners",
  icon: SanityIcon.HeartFilledIcon,
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
              type: "string",
            },
            {
              name: "logo",
              type: "image",
            },
            {
              name: "link",
              type: "url",
            },
          ],
        },
      ],
    }),
  ],
});
