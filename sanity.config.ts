import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { documentInternationalization } from "@sanity/document-internationalization";
import { codeInput } from "@sanity/code-input";

const singletonTypes = new Set(["settings", "homepage"]);
const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const supportedLanguages = [
  { id: "en", title: "English" },
  { id: "fr", title: "French" },
  { id: "it", title: "Italian" },
  { id: "de", title: "German" },
];

const createLocalizedList = (
  S: StructureBuilder,
  type: string,
  title: string,
) => {
  return S.listItem()
    .title(title)
    .id(type)
    .child(
      S.list()
        .title(`${title} by Language`)
        .items(
          supportedLanguages.map((lang) =>
            S.listItem()
              .title(lang.title)
              .child(
                S.documentList()
                  .title(`${title} (${lang.title})`)
                  .filter(`_type == "${type}" && language == $lang`)
                  .params({ lang: lang.id }),
              ),
          ),
        ),
    );
};

export default defineConfig({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: [
    codeInput(),
    documentInternationalization({
      supportedLanguages,
      schemaTypes: ["page", "homepage", "post", "settings", "project"],
    }),
    structureTool({
      structure: (S, context) => {
        const { currentUser } = context;
        const isAdmin = currentUser?.roles.some(
          (role) => role.name === "administrator",
        );
        return S.list()
          .title("Content")
          .items(
            isAdmin
              ? [
                  S.listItem()
                    .title("Settings")
                    .id("settings")
                    .child(
                      S.document()
                        .schemaType("settings")
                        .documentId("settings"),
                    ),
                  S.listItem()
                    .title("Homepage")
                    .id("homepage")
                    .child(
                      S.document()
                        .schemaType("homepage")
                        .documentId("homepage"),
                    ),

                  createLocalizedList(S, "project", "Projects"),
                  createLocalizedList(S, "page", "Pages"),
                ]
              : [createLocalizedList(S, "post", "News")],
          );
      },
    }),
  ],
  schema: {
    types: schemaTypes,

    templates: (templates, context) => {
      const { currentUser } = context;
      const isAdmin = currentUser?.roles.some(
        (role) => role.name === "administrator",
      );
      return templates.filter(({ id }) =>
        isAdmin ? id === "page" || id === "project" : id === "post",
      );
    },
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
