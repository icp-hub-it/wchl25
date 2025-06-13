import { defineField } from "sanity";
import * as Icons from "@sanity/icons";

export const sectionTimeline = defineField({
  name: "sectionTimeline",
  type: "object",
  title: "Timeline",
  icon: Icons.CalendarIcon,
  fields: [
    {
      name: "dummy",
      type: "string",
    },
  ],
});
