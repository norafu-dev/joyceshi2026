import {defineArrayMember, defineField, defineType} from "sanity";

const aspectRatioField = () =>
  defineField({
    name: "aspectRatio",
    title: "Aspect Ratio",
    type: "string",
    description: "Controls the displayed height while the media width stays fixed.",
    options: {
      list: [
        {title: "16:9", value: "16:9"},
        {title: "4:3", value: "4:3"},
        {title: "1:1", value: "1:1"},
      ],
      layout: "radio",
    },
    initialValue: "16:9",
  });

const projectImage = defineArrayMember({
  name: "projectImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      image: "image",
    },
    prepare({image}) {
      return {
        title: "Image",
        media: image,
      };
    },
  },
});

const projectVideo = defineArrayMember({
  name: "projectVideo",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "file",
      title: "File",
      type: "file",
      options: {
        accept: ["video/*"],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "autoplay",
      title: "Autoplay",
      type: "boolean",
      initialValue: false,
    }),
    aspectRatioField(),
  ],
  preview: {
    select: {
      filename: "file.asset.originalFilename",
      thumbnail: "thumbnail",
    },
    prepare({filename, thumbnail}) {
      return {
        title: "Video",
        subtitle: filename,
        media: thumbnail,
      };
    },
  },
});

const projectRow = defineArrayMember({
  name: "projectRow",
  title: "Media Row",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Media",
      type: "array",
      of: [projectImage, projectVideo],
      options: {
        sortable: true,
      },
      validation: (rule) =>
        rule.required().min(1).max(2).error("A row must contain one or two media items."),
    }),
  ],
  preview: {
    select: {
      firstImage: "items.0.image",
      firstThumbnail: "items.0.thumbnail",
      firstType: "items.0._type",
      secondType: "items.1._type",
    },
    prepare({firstImage, firstThumbnail, firstType, secondType}) {
      const types = [firstType, secondType].filter(Boolean).map(formatMediaType);

      return {
        title: "Media row",
        subtitle: types.join(" + ") || "Empty row",
        media: firstImage || firstThumbnail,
      };
    },
  },
});

const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    {name: "details", title: "Details", default: true},
    {name: "listing", title: "Listing & Covers"},
    {name: "content", title: "Project Media"},
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "details",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "passwordProtected",
      title: "Password Protected",
      type: "boolean",
      group: "details",
      initialValue: false,
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "details",
    }),
    defineField({
      name: "awards",
      title: "Awards",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          title: "Award",
          type: "object",
          fields: [
            defineField({name: "year", title: "Year", type: "number"}),
            defineField({name: "award", title: "Award", type: "string"}),
          ],
          preview: {
            select: {
              title: "award",
              year: "year",
            },
            prepare({title, year}) {
              return {
                title: title || "Award",
                subtitle: year ? String(year) : undefined,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "buy",
      title: "Buy",
      type: "url",
      group: "details",
    }),
    defineField({
      name: "landingPage",
      title: "Landing Page",
      type: "boolean",
      group: "listing",
    }),
    defineField({
      name: "landingPageOrder",
      title: "Landing Page Order",
      type: "number",
      group: "listing",
    }),
    defineField({
      name: "landingPageCover",
      title: "Landing Page Cover",
      type: "object",
      group: "listing",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "desktop",
          title: "Desktop",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "mobile",
          title: "Mobile / Tablet",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "listing",
      options: {
        list: [
          {title: "brand & campaign system", value: "brand-campaign-system"},
          {title: "print & editorial design", value: "print-editorial-design"},
          {title: "digital design", value: "digital-design"},
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "categoryPageOrder",
      title: "Category Page Order",
      type: "number",
      group: "listing",
    }),
    defineField({
      name: "categoryPageCover",
      title: "Category Page Cover",
      type: "object",
      group: "listing",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "video",
          title: "Video",
          type: "object",
          options: {
            collapsible: true,
            collapsed: true,
          },
          fields: [
            defineField({
              name: "file",
              title: "File",
              type: "file",
              options: {
                accept: ["video/*"],
              },
            }),
            defineField({
              name: "thumbnail",
              title: "Thumbnail",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
            aspectRatioField(),
          ],
        }),
      ],
    }),
    defineField({
      name: "rows",
      title: "Project Media",
      description: "Add rows in display order. Each row can contain one or two images or videos.",
      type: "array",
      group: "content",
      of: [projectRow],
      options: {
        sortable: true,
        modal: {
          type: "dialog",
          width: 2,
        },
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      media: "landingPageCover.desktop",
    },
    prepare({title, category, media}) {
      return {
        title: title || "Untitled project",
        subtitle: category,
        media,
      };
    },
  },
});

function formatMediaType(type) {
  if (type === "projectVideo") {
    return "Video";
  }

  if (type === "projectImage") {
    return "Image";
  }

  return "Media";
}

export default project;
