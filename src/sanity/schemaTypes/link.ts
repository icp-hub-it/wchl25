import { defineType } from "sanity";

export const linkType = defineType({
  name: "link",
  type: "object",
  options: {
    collapsed: true,
    collapsible: true,
  },
  initialValue: {
    type: "reference",
  },
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "url",
      type: "url",
      title: "URL",
      hidden: ({ parent }) => parent?.type !== "url", // Show only if type is "url"
    },

    {
      name: "reference",
      type: "reference",
      title: "Page Reference",
      to: [{ type: "page" }], // Adjust to your schema
      hidden: ({ parent }) => parent?.type !== "reference", // Show only if type is "reference"
    },

    {
      name: "file",
      type: "file",
      title: "File Download",
      hidden: ({ parent }) => parent?.type !== "file", // Show only if type is "file"
    },
    {
      name: "type",
      type: "string",
      title: "Type of Link",
      options: {
        list: [
          { title: "Page Reference", value: "reference" },
          { title: "External URL", value: "url" },
          { title: "File Download", value: "file" },
        ],
        layout: "radio",
      },
    },
  ],
});
