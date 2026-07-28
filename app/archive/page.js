import AnimatedImage, { AnimatedImageSequence } from "@/components/animated-image";
import ArchiveScrollToTop from "./scroll-to-top";
import SiteFooter from "@/components/footer";
import { ARCHIVE_PAGE_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

const itemColumns = [
  "desktop:col-start-2 desktop:col-span-6",
  "desktop:col-start-10 desktop:col-span-6",
  "desktop:col-start-18 desktop:col-span-6",
];

export default async function ArchivePage() {
  const { data: archive } = await sanityFetch({
    query: ARCHIVE_PAGE_QUERY,
  });

  const items = (archive?.items || []).filter((item) => item.image?.asset?.url);

  return (
    <main
      className="archive-page container min-h-[calc(100vh-24px)] pt-[var(--project-media-nav-gap)] text-white"
      id="archive-top"
    >
      <ArchiveScrollToTop />

      <AnimatedImageSequence>
        <section className="archive-grid">
          {items.map((item, index) => (
            <ArchiveItem
              className={itemColumns[index % itemColumns.length]}
              index={index}
              item={item}
              key={item._key}
            />
          ))}
        </section>
      </AnimatedImageSequence>

      <SiteFooter
        mobileSecondaryLabel="Return"
        secondaryHref="/"
        secondaryLabel="Return to work"
        topHref="#archive-top"
      />
    </main>
  );
}

function ArchiveItem({ className, index, item }) {
  const imageUrl = item.image?.asset?.url;

  if (imageUrl) {
    return (
      <figure className={`archive-item ${className} m-0`}>
        <AnimatedImage
          alt=""
          imageClassName="h-auto w-full"
          height={item.image?.asset?.metadata?.dimensions?.height || 1}
          loading={index < 3 ? "eager" : "lazy"}
          sizes="(min-width: 1000px) 28vw, 83vw"
          src={imageUrl}
          sequenceIndex={index}
          width={item.image?.asset?.metadata?.dimensions?.width || 1}
        />
      </figure>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`archive-item ${className} aspect-square bg-purple`}
    />
  );
}
