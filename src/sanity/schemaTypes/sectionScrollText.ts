import { defineField } from "sanity";
import { BlockContentIcon } from "@sanity/icons";

export const sectionScrollText = defineField({
  name: "sectionScrollText",
  type: "object",
  title: "Scroll Text",
  icon: BlockContentIcon,
  fields: [
    {
      name: "text",
      type: "string",
    },
  ],
});
