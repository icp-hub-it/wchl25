import { defineField } from "sanity";
import * as SanityIcon from "@sanity/icons";

export const sectionWorkshops = defineField({
  name: "sectionWorkshops",
  type: "object",
  title: "Workshops",
  icon: SanityIcon.TiersIcon,
  initialValue: {
    layout: "cards",
  },
  fields: [
    {
      name: "title",
      type: "string",
    },
    defineField({
      name: "workshops",
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
              name: "kind",
              type: "string",
              options: {
                list: [{ title: "Tech Workshop", value: "tech-workshop" }],
                layout: "radio",
              },
            },
            {
              name: "date",
              type: "datetime",
            },
            {
              name: "participants",
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
                      type: "blockContent",
                    },
                    {
                      name: "image",
                      type: "image",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "resources",
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
              name: "kind",
              type: "string",
              options: {
                list: [
                  { title: "Tech", value: "tech" },
                  { title: "Community", value: "community" },
                  { title: "Business", value: "business" },
                ],
                layout: "radio",
              },
            },
            {
              name: "link",
              type: "url",
            },
            {
              name: "participants",
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
                      type: "blockContent",
                    },
                    {
                      name: "image",
                      type: "image",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
