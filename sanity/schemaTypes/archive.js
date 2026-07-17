import { defineArrayMember, defineField, defineType } from "sanity";

const archive = defineType({
  name: "archive",
  title: "Archive",
  type: "document",
  initialValue: {
    title: "Archive",
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Archive",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        defineArrayMember({
          name: "archiveItem",
          title: "Archive Item",
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
            }),
          ],
          preview: {
            select: {
              image: "image",
            },
            prepare({ image }) {
              return {
                title: "Archive item",
                media: image,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Archive",
      };
    },
  },
});

export default archive;
