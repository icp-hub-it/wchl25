import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import juno from "@junobuild/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import { loadEnv } from "vite";
import preload from "astro-preload";
import { preloadSanityFiles } from "./src/utils/preloadSanityFile";

export const { SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET } = loadEnv(
  process.env.NODE_ENV || "development",
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  site: "https://wchl25.worldcomputer.com",

  output: "static",
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    mdx(),
    sitemap(),
    sanity({
      projectId: SANITY_STUDIO_PROJECT_ID,
      dataset: SANITY_STUDIO_DATASET,
      // Set useCdn to false if you're building statically.
      useCdn: false,
      apiVersion: "2025-01-13",
      // We don't set this here to avoid SSR issues.
      // See https://github.com/sanity-io/sanity-astro/issues/232.
      // We rather compile the Studio manually and place it in the dist/studio folder before deploying.
      // See https://www.sanity.io/docs/deployment#ed3cd78ea4eb (the "Self-hosting the Studio" section).
      // studioBasePath: "/studio"
    }),
    react(),
    preload(),
    preloadSanityFiles(),
  ],

  vite: {
    plugins: [juno(), tailwindcss()],
  },

  devToolbar: {
    enabled: false,
  },
});
