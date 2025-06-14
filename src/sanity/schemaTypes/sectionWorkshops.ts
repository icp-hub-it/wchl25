import { defineField } from "sanity";
import * as SanityIcon from "@sanity/icons";

export const sectionWorkshops = defineField({
  name: "sectionWorkshops",
  type: "object",
  title: "Workshops",
  icon: SanityIcon.TiersIcon,
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
              type: "string",
            },
            {
              name: "kind",
              type: "string",
              options: {
                list: [
                  { title: "Tech Workshop", value: "tech" },
                  { title: "Community Workshop", value: "community" },
                  { title: "Business Workshop", value: "business" },
                ],
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
                      type: "string",
                    },
                    {
                      name: "company",
                      type: "string",
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
              name: "website",
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
                      type: "string",
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
