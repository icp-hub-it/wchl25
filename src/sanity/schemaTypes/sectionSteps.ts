import { defineField } from "sanity";
import * as Icons from "@sanity/icons";

export const sectionSteps = defineField({
  name: "sectionSteps",
  type: "object",
  title: "Steps",
  icon: Icons.TaskIcon,
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
      name: "info",
      type: "string",
    },
    {
      name: "showSteps",
      type: "boolean",
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
              type: "string",
            },
          ],
        },
      ],
    }),
  ],
});
