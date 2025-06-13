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
      type: "blockContent",
    },
    {
      name: "info",
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
          ],
        },
      ],
    }),
  ],
});
