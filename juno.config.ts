import { defineConfig } from "@junobuild/config";

export default defineConfig(({ mode }) => ({
  satellite: {
    ids: {
      development: "hc2yi-zqaaa-aaaal-asgba-cai",
      staging: "hc2yi-zqaaa-aaaal-asgba-cai",
      production: "hc2yi-zqaaa-aaaal-asgba-cai",
    },
    source: "dist",
    predeploy: [
      "rm -rf dist .sanity",
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
