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
    slug
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
    groq`*[_type == "post" && defined(slug.current] | order(_createdAt desc)`,
    { locale },
  );
}

export async function getLocalizedPosts(
  locale: string,
  excludeSlug?: string,
  limit: number = 3,
): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current) ${
      excludeSlug ? "&& slug.current != $excludeSlug" : ""
    }] 
      | order(_createdAt desc)[0...$limit]`,
    { locale, excludeSlug: excludeSlug ?? null, limit },
  );
}

export async function getPages(locale: string) {
  return await sanityClient.fetch(
    groq`*[_type == "page" && defined(slug.current)] | order(_createdAt desc){slug}`,
    { locale },
  );
}

export async function getPost(locale: string, slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
    title, 
    _createdAt,
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

export async function getPage(locale: string, slug: string) {
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
      ${sectionsFields}
    }`,
    {
      locale,
      slug,
    },
  );
}

export async function getHomepage() {
  return await sanityClient.fetch(
    groq`*[_type == "homepage"][0] {
    heroSection{
      headline,
      subHeadline,
      ascii,
      link {
      ${linkFields}},
      mainImage{
        asset->{
          url,
          metadata { lqip, dimensions }
        }
      }
    },
    ${sectionsFields}
  }`,
    {},
  );
}

export async function getSettings(locale: string) {
  return await sanityClient.fetch(
    groq`*[_type == "settings"][0]{
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
              slug
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
