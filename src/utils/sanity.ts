import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

const linkFields = `
  type,
  title,
  url,
  reference->{
    title,
    slug,
    language
  },
  file {
    asset->{
      ...
  }
}`;

const sectionsFields = `
  sections[]{
    ...,
    asset->{
        ...
    },
    _type,
    links[]{
      ${linkFields}
    },
    link {
      ${linkFields}
    },
    items[]{
     ...,
     link {
      ${linkFields}
     }
    },
    news[]->
  }
`;

export async function getPosts(locale: string): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current) && language == $locale] | order(_createdAt desc)`,
    { locale },
  );
}

export async function getLocalizedPosts(
  locale: string,
  excludeSlug?: string,
  limit: number = 3,
): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current) && language == $locale ${
      excludeSlug ? "&& slug.current != $excludeSlug" : ""
    }] 
      | order(_createdAt desc)[0...$limit]`,
    { locale, excludeSlug: excludeSlug ?? null, limit },
  );
}

export async function getPages() {
  return await sanityClient.fetch(
    groq`*[_type == "page" && defined(slug.current) ] | order(_createdAt desc){language, slug}`,
  );
}

export async function getHomepages(locale: string) {
  return await sanityClient.fetch(
    groq`*[_type == "homepage" && language == $locale]{language}`,
    { locale },
  );
}

export async function getPost(locale: string, slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug && language == $locale][0]{
    title, 
    _createdAt,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      slug,
      language
    },
    body,
    mainImage,
    publishedAt,
    link {
          type,
          title,
          url,
          reference->{
            _type,
            title,
            slug
          },
          file {
            asset->{
              url
            }
          }
        }
    }`,
    {
      locale,
      slug,
    },
  );
}

export async function getPage(slug: string) {
  return await sanityClient.fetch(
    groq`*[_type == "page" && slug.current == $slug][0]{
      title,
      ...,
      heroSection {
        ...,
        links[] {
         ${linkFields}
        },
      },
      ${sectionsFields},
      
    }`,
    {
      slug,
    },
  );
}

export async function getHomepage() {
  return await sanityClient.fetch(
    groq`*[_type == "homepage"][0] {
    ctaText,
    ctaUrl,
    faqUrl,
    countdownDate,
    countdownText,
    ${sectionsFields}
  }`,
    {},
  );
}

export async function getSettings(locale: string) {
  return await sanityClient.fetch(
    groq`*[_type == "settings" && language == $locale][0]{
    ...,
      header []{
        _type,
        ${linkFields},
        menuItems[]{
          _type,
          icon,
          title,
          link {
            ${linkFields}
          }
        }
      },
      footer {
        links[]{
          title,
          link->{
              _type,
              title,
              slug,
              language
            },
        },
        text,
        socialLinks[]{
          title,
          link
        }
      },
      seo
      }`,
    { locale },
  );
}

export type LinkType = {
  title?: string;
  url?: string;
  reference?: {
    _type: "reference";
    _ref: string; // ID of the referenced document
  };
  file?: {
    _type: "file";
    asset: {
      _ref: string; // ID of the uploaded file asset
      _type: "reference";
    };
  };
  type: "reference" | "url" | "file";
};

export interface Post {
  _type: "post";
  _createdAt: string;
  publishedAt: string;
  title?: string;
  slug: Slug;
  mainImage?: ImageAsset & { alt?: string };
  body: PortableTextBlock[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaImage: ImageAsset;
  };
  _translations: {
    slug: Slug;
    language: string;
  }[];
  link: {
    type: "url" | "reference" | "file";
    url?: string;
    reference?: {
      _type: "page";
      title: string;
      slug: Slug;
    };
    file?: {
      asset: {
        url: string;
      };
    };
  };
}
