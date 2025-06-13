import { defineField } from "sanity";
import * as SanityIcon from "@sanity/icons";

export const sectionHubMap = defineField({
  name: "sectionHubMap",
  type: "object",
  title: "Hub Map",
  icon: SanityIcon.EarthGlobeIcon,
  fields: [
    {
      name: "title",
      type: "string",
    },
  ],
});
