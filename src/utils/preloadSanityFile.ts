import type { AstroIntegration } from "astro";
import fs from "fs";

// same path used in astro-preload
const PRELOADED_ASSETS_PATH = "assets/files";
const PUBLIC_ASSETS_PATH = `public/${PRELOADED_ASSETS_PATH}`;

/**
 * Inspired by https://github.com/LyonSyonII/astro-preload/blob/8f78474e0eefde10b7871a473ab5b028da01824a/components/Image.astro
 */
export const preloadSanityFile = async (
  href: string,
  name?: string,
): Promise<string> => {
  // Download only on production to avoid downloading multiple times
  if (process.env.NODE_ENV === "production" && !href.startsWith("/")) {
    if (!name) {
      name = new URL(href).pathname.split("/").pop();
    }

    if (!name) {
      throw `[preloadSanityFile] name not provided and cannot be extracted from the url ${href}.\nPlease, provide a name.`;
    }

    try {
      fs.mkdirSync(PUBLIC_ASSETS_PATH, { recursive: true });
      const response = await fetch(href);
      const blob = await response.blob();
      const filePath = `${PUBLIC_ASSETS_PATH}/${name}`;
      // Check if the file already exists
      if (fs.existsSync(filePath)) {
        console.warn(
          `[preloadSanityFile]: File ${name} already exists in ${filePath}, replacing it...`,
        );
      }
      fs.writeFileSync(filePath, new Uint8Array(await blob.arrayBuffer()));
      console.log(
        `[preloadSanityFile]: Downloaded file ${name} into ${filePath}`,
      );
      href = import.meta.env.BASE_URL + `${PRELOADED_ASSETS_PATH}/${name}`;
    } catch {
      console.log(
        `[preloadSanityFile]: Failed to load file '${name}', fallback to using '${href}'`,
      );
    }
  }

  return href;
};

/**
 * Inspired by https://github.com/LyonSyonII/astro-preload/blob/8f78474e0eefde10b7871a473ab5b028da01824a/index.ts
 */
export function preloadSanityFiles(): AstroIntegration {
  return {
    name: "preloadSanityFiles",
    hooks: {
      "astro:build:done": () => {
        fs.mkdirSync(`dist/${PRELOADED_ASSETS_PATH}`, { recursive: true });
        const files = fs.readdirSync(PUBLIC_ASSETS_PATH);
        files.forEach((file) =>
          fs.copyFileSync(
            `${PUBLIC_ASSETS_PATH}/${file}`,
            `dist/${PRELOADED_ASSETS_PATH}/${file}`,
          ),
        );
      },
    },
  };
}
