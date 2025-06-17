import { defineConfig } from "@junobuild/config";

export default defineConfig(({ mode }) => ({
  satellite: {
    id: "hx5jf-yyaaa-aaaal-asgcq-cai",
    source: "dist",
    predeploy: [
      "rm -rf dist .sanity",
      "mkdir -p public/assets/preloaded", // Make sure the preloaded folder exists
      "mkdir -p public/assets/files", // Make sure the files folder exists
      `pnpm build --mode ${mode}`, // Build the Astro + Sanity website
      "pnpm sanity build dist/studio -y", // compile Sanity Studio manually
    ],
    storage: {
      rewrites: [
        // Refreshing a page like /studio/structures actually renders the content of the home page
        // This rewrite makes sure that this doesn't happen
        {
          source: "/studio/**",
          destination: "/studio",
        },
      ],
    },
  },
  orbiter: {
    ids: {
      development: "upskx-jiaaa-aaaas-amlra-cai",
      staging: "upskx-jiaaa-aaaas-amlra-cai",
      production: "upskx-jiaaa-aaaas-amlra-cai",
    },
  },
}));
