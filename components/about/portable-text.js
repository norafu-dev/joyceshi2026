export const portableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 last:mb-0">{children}</p>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        className="text-black underline"
        href={value?.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    ),
  },
};

export const listPortableTextComponents = {
  ...portableTextComponents,
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
};
