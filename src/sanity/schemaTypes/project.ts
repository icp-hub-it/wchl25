import { defineType, defineField } from "sanity";

export const projectType = defineType({
  name: "project",
  type: "document",
  title: "Leaderboard Project",
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "github", type: "url" }),
    defineField({ name: "link", type: "url" }),
    defineField({ name: "score", type: "number" }),
    defineField({
      name: "tab",
      type: "string",
      options: {
        list: [
          { title: "America", value: "1" },
          { title: "Africa", value: "2" },
          { title: "Europe", value: "3" },
          { title: "Asia", value: "4" },
        ],
      },
    }),
  ],
});
