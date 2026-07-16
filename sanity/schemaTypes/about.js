import { defineArrayMember, defineField, defineType } from "sanity";

const linkAnnotation = defineField({
  name: "link",
  title: "External link",
  type: "object",
  fields: [
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https", "mailto"],
        }),
    }),
  ],
});

const simplePortableText = [
  defineArrayMember({
    type: "block",
    styles: [{ title: "Normal", value: "normal" }],
    lists: [],
    marks: {
      decorators: [],
      annotations: [linkAnnotation],
    },
  }),
];

const datedItem = defineArrayMember({
  type: "object",
  fields: [
    defineField({
      name: "year",
      title: "Year",
      type: "string"
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "array",
      of: simplePortableText,
    }),
  ],
  preview: {
    select: {
      year: "year",
      title: "text.0.children.0.text",
    },
    prepare({ title, year }) {
      return {
        title: title || "Untitled item",
        subtitle: year,
      };
    },
  },
});

const datedItemsField = (name, title) =>
  defineField({
    name,
    title,
    type: "array",
    of: [datedItem],
  });

const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  initialValue: {
    title: "About",
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "About",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: simplePortableText,
    }),
    datedItemsField("exhibitionsEvents", "Exhibitions & Events"),
    datedItemsField("awards", "Awards"),
    datedItemsField("press", "Press"),
    defineField({
      name: "clientsCollaborators",
      title: "Clients & Collaborators",
      type: "array",
      of: simplePortableText,
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "About",
      };
    },
  },
});

export default about;
