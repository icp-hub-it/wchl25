import { defineField, defineType } from "sanity";
import { sectionText } from "./sectionText";
import React from "react";
import { sectionCards } from "./sectionCards";
import { sectionAscii } from "./sectionAscii";
import { sectionHighlight } from "./sectionHighlight";
import { sectionRows } from "./sectionRows";
import { sectionTeam } from "./sectionTeam";
import { sectionContact } from "./sectionContact";
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
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    {
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    },

    {
      type: "object",
      name: "heroSection",

      fields: [
        defineField({
          name: "headline",
          type: "string",
          description: "Main title for the section (recommended).",
        }),
        {
          name: "text",
          type: "blockContent",
          hidden: ({ document }) => document?.template === "news",
        },
        {
          name: "ascii",
          title: "ASCII Image",
          type: "code",
          options: {
            language: "plaintext",
            languageAlternatives: [],
          },
          hidden: ({ document }) => document?.template === "news",
        },
        defineField({
          name: "links",
          hidden: ({ document }) => document?.template !== "default",
          type: "array",
          description:
            "One or more buttons to redirect other urls, pages or files (optional).",
          of: [
            defineField({
              name: "link",
              type: "link",
            }),
          ],
        }),
      ],
    },
    defineField({
      name: "sections",
      type: "array",
      of: [
        sectionText,
        sectionCards,
        sectionAscii,
        sectionHighlight,
        sectionRows,
        sectionTeam,
        sectionContact,
      ],
      hidden: ({ parent }) => parent?.template !== "default",
    }),
    {
      name: "template",
      type: "string",
      options: {
        list: [
          {
            title: "Default Page",
            value: "default",
          },
          {
            title: "Contact Page",
            value: "contact",
          },
          {
            title: "News Page",
            value: "news",
          },
        ],
      },
      validation: (rule) => rule.required(),
    },
    seo,
  ],
  preview: {
    select: {
      title: "title",
      language: "language",
    },
    prepare({ title, language }) {
      // Directly set the emoji based on language
      const flagEmoji =
        language === "en"
          ? "🇬🇧"
          : language === "it"
            ? "🇮🇹"
            : language === "fr"
              ? "🇫🇷"
              : language === "de"
                ? "🇮🇩"
                : "🌐";

      // Render flagEmoji directly as media using a text-based representation
      return {
        title,
        subtitle: "",
        media: () =>
          React.createElement(
            "span",
            { style: { fontSize: "1rem", display: "block" } },
            flagEmoji,
          ),
      };
    },
  },
});
