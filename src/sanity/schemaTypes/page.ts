import { defineField, defineType } from "sanity";
import { sectionFaq } from "./sectionFaq";
import React from "react";
import { seo } from "./seo";
import { EarthGlobeIcon } from "@sanity/icons";

export const pageType = defineType({
  name: "page",
  type: "document",
  initialValue: {
    template: "default",
    language: "en",
  },
  groups: [{ name: "seo", title: "SEO", icon: EarthGlobeIcon }],
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "sections",
      type: "array",
      of: [sectionFaq],
      hidden: ({ parent }) => parent?.template !== "default",
    }),
    defineField({
      name: "leaderboard",
      type: "object",
      fields: [
        {
          name: "headline",
          type: "string",
        },
        {
          name: "tabs",
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
                  name: "projects",
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
                          name: "github",
                          type: "url",
                        },
                        {
                          name: "link",
                          type: "url",
                        },
                        {
                          name: "score",
                          type: "number",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.template !== "leaderboard",
    }),
    defineField({
      name: "winners",
      type: "object",
      fields: [
        {
          name: "headline",
          type: "string",
        },
        {
          name: "rounds",
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
                  name: "hubs",
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
                          name: "logos",
                          type: "array",
                          of: [{ type: "image" }],
                        },
                        {
                          name: "projects",
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
                                  name: "github",
                                  type: "url",
                                },
                                {
                                  name: "link",
                                  type: "url",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.template !== "winners",
    }),
    defineField({
      name: "template",
      type: "string",
      initialValue: "default",
      options: {
        list: ["default", "winners", "leaderboard"],
      },
    }),
    seo,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      // Render flagEmoji directly as media using a text-based representation
      return {
        title,
        subtitle: "",
        media: () =>
          React.createElement("span", {
            style: { fontSize: "1rem", display: "block" },
          }),
      };
    },
  },
});
