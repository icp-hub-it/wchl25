import { defineField } from "sanity";
import * as SanityIcon from "@sanity/icons";

export const sectionPartners = defineField({
  name: "sectionPartners",
  type: "object",
  title: "Partners",
  icon: SanityIcon.HeartFilledIcon,
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
              name: "logo",
              type: "image",
            },
          ],
        },
      ],
    }),
  ],
});
