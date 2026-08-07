import { PortableText } from "@portabletext/react";
import { listPortableTextComponents } from "./portable-text";

export const datedSections = [
  {
    title: "Exhibitions & Events",
    field: "exhibitionsEvents",
  },
  {
    title: "Awards",
    field: "awards",
  },
  {
    title: "Press",
    field: "press",
  },
];

export function DatedSection({ title, items }) {
  if (!items?.length) {
    return null;
  }

  return (
    <section className="about-info-section mb-15 last:mb-0">
      <h2 className="about-info-heading mb-6">{title}</h2>

      <div className="about-info-content">
        {items.map((item) => (
          <div
            className="about-info-row grid grid-cols-7 gap-x-1"
            key={item._key}
          >
            <p className="about-info-year col-span-2">{item.year}</p>
            <div className="about-info-value col-span-5">
              {item.text ? (
                <PortableText
                  components={listPortableTextComponents}
                  value={item.text}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TextSection({ title, value }) {
  if (!value?.length) {
    return null;
  }

  return (
    <section className="about-info-section mb-16 last:mb-0">
      <h2 className="about-info-heading mb-6">{title}</h2>
      <div className="about-info-content">
        <PortableText components={listPortableTextComponents} value={value} />
      </div>
    </section>
  );
}
