import { defineArrayMember, defineField, defineType } from "sanity";
import {
  TagIcon,
  TagsIcon,
  CogIcon,
  ImageIcon,
  EarthGlobeIcon,
} from "@sanity/icons";
import { seo } from "./seo";

const menuItem = defineField({
  name: "menuItem",
  title: "Menu Item",
  type: "link",
  icon: TagIcon,
});

const subMenu = defineField({
  name: "subMenu",
  title: "Sub Menu",
  type: "object",
  icon: TagsIcon,
  preview: {
    select: {
      title: "title",
      items: "menuItems",
    },
    prepare({ title, items }) {
      return {
        title,
        subtitle: `Submenu (${items.length} items)`,
      };
    },
  },
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    },
    {
      name: "menuItems",
      title: "SubMenu Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "menuItem",
          icon: TagIcon,
          preview: {
            select: {
              title: "link.title",
              type: "link.type",
            },
            prepare({ title, type }) {
              return {
                title: title || "Untitled Link",
                subtitle: "Type: " + type,
              };
            },
          },
          fields: [
            {
              name: "link",
              type: "link",
              options: {
                collapsible: false,
              },
            },
            {
              name: "icon",
              type: "code",
              icon: ImageIcon,
              title: "Icon",
            },
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    },
  ],
});

export const settingsType = defineType({
  name: "settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "SEO", icon: EarthGlobeIcon },
  ],
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),

    // ✅ Header Group
    defineField({
      name: "header",
      title: "Header Menu",
      description: "Manage the header menu with items and submenus.",
      type: "array",
      of: [defineArrayMember(menuItem), defineArrayMember(subMenu)],
      group: "header",
    }),

    // ✅ Footer Group
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "footer",
      fields: [
        {
          name: "links",
          title: "Footer Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  type: "string",
                },
                { name: "link", type: "reference", to: [{ type: "page" }] },
              ],
            },
          ],
        },
        {
          name: "text",
          title: "Footer Text",
          type: "blockContent",
        },
        {
          name: "socialLinks",
          title: "Social Links",
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
                  name: "link",
                  type: "url",
                },
              ],
            },
          ],
        },
      ],
    }),

    // defineField({
    //   name: "mainImage",
    //   title: "Main Image",
    //   type: "image",
    //   options: { hotspot: true },
    //   group: "footer",
    //   fields: [
    //     {
    //       name: "alt",
    //       type: "string",
    //       title: "Alternative Text",
    //     },
    //   ],
    // }),

    defineField({
      name: "whitePaper",
      title: "White Paper",
      type: "file",
      group: "footer",
    }),
    seo,
  ],
  preview: {
    prepare() {
      return { title: "Settings" };
    },
  },
});
