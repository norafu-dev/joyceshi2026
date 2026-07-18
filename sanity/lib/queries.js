import { defineQuery } from "next-sanity";

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "about"][0] {
    _id,
    title,
    bio,
    exhibitionsEvents[] {
      _key,
      year,
      text
    },
    awards[] {
      _key,
      year,
      text
    },
    press[] {
      _key,
      year,
      text
    },
    clientsCollaborators
  }
`);

export const ARCHIVE_PAGE_QUERY = defineQuery(`
  *[_type == "archive"][0] {
    _id,
    title,
    items[] {
      _key,
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        }
      }
    }
  }
`);

export const PROJECT_CATEGORIES = [
  {
    title: "brand & campaign system",
    value: "brand-campaign-system",
  },
  {
    title: "print & editorial design",
    value: "print-editorial-design",
  },
  {
    title: "digital design",
    value: "digital-design",
  },
];

export const LANDING_PAGE_PROJECTS_QUERY = defineQuery(`
  *[
    _type == "project" &&
    landingPage == true
  ] | order(landingPageOrder asc) {
    _id,
    title,
    "slug": slug.current,
    category,
    landingPageCover {
      desktop {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        }
      },
      mobile {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        }
      }
    }
  }
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[
    _type == "project" &&
    defined(slug.current)
  ] {
    "slug": slug.current,
    category
  }
`);

export const PROJECT_BY_CATEGORY_AND_SLUG_QUERY = defineQuery(`
  *[
    _type == "project" &&
    slug.current == $slug &&
    (
      category == $category ||
      $category in category[]
    )
  ][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    year,
    description,
    awards,
    buy
  }
`);

export const PROJECTS_BY_CATEGORY_QUERY = defineQuery(`
  *[
    _type == "project" &&
    defined(slug.current) &&
    (
      category == $category ||
      $category in category[]
    )
  ] | order(categoryPageOrder asc) {
    _id,
    title,
    "slug": slug.current,
    category,
    year,
    description,
    categoryPageOrder,
    categoryPageCover {
      image {
        alt,
        crop,
        hotspot,
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        }
      },
      video {
        aspectRatio,
        file {
          asset->{
            _id,
            url,
            mimeType
          }
        },
        thumbnail {
          crop,
          hotspot,
          asset->{
            _id,
            url,
            metadata {
              dimensions,
              lqip
            }
          }
        }
      }
    }
  }
`);
