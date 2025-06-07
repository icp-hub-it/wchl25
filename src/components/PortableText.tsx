import type { SomePortableTextComponents } from "astro-portabletext/types";
import { urlFor } from "../utils/image";

export const portableTextComponents: SomePortableTextComponents = {
  type: {
    image: ({ node }) => {
      const imageUrl = urlFor(node).url();
      const altText = node.alt || "Image";

      return (
        <figure className="my-8">
          <img src={imageUrl} alt={altText} className="w-full" loading="lazy" />
          {altText && (
            <figcaption className="mt-2 text-sm text-neutral-600">
              {altText}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};
