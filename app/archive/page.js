import Link from "next/link";
import AnimatedImage, { AnimatedImageSequence } from "@/components/animated-image";
import BackToTopIcon from "@/components/back-to-top-icon";
import ArchiveScrollToTop from "./scroll-to-top";
import { ARCHIVE_PAGE_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

const itemColumns = [
  "col-start-2 col-span-6",
  "col-start-10 col-span-6",
  "col-start-18 col-span-6",
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
        <section className="contents">
          {items.map((item, index) => (
            <ArchiveItem
              className={`${itemColumns[index % itemColumns.length]} mb-[90px]`}
              index={index}
              item={item}
              key={item._key}
            />
          ))}
        </section>
      </AnimatedImageSequence>

      <ArchiveFooter />
    </main>
  );
}

function ArchiveItem({ className, index, item }) {
  const imageUrl = item.image?.asset?.url;

  if (imageUrl) {
    return (
      <figure className={`${className} m-0`}>
        <AnimatedImage
          alt=""
          imageClassName="h-auto w-full"
          height={item.image?.asset?.metadata?.dimensions?.height || 1}
          loading={index < 3 ? "eager" : "lazy"}
          sizes="28vw"
          src={imageUrl}
          sequenceIndex={index}
          width={item.image?.asset?.metadata?.dimensions?.width || 1}
        />
      </figure>
    );
  }

  return <div aria-hidden="true" className={`${className} aspect-square bg-purple`} />;
}

function ArchiveFooter() {
  return (
    <footer className="container col-span-24 mt-[200px] text-white">
      <div className="col-span-3 self-center">
        <a href="#">
          Back to top <BackToTopIcon />
        </a>
      </div>

      <div className="col-start-4 col-span-3 self-center">
        <Link className="underline" href="/">
          Return to work
        </Link>
      </div>

      <div className="col-start-18 col-span-2 flex flex-col">
        <a href="https://www.instagram.com/gloamaxis/?igshid=YmMyMTA2M2Y%3D" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGNWLSerqeJMgAAAZ9foGzoYoxpxz3iECS684sBRXnGjFvtpmFfe6ayL8q-pqrkG12S0xWPYvpXq3TK-KZFi9dqO-tPUzp9PFkA_tAPzmJGt-gSu49Hod6vicm0lbNg9rkgPmI=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fjoyce-shi-553272167" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>

      <div className="col-start-20 col-span-4 flex flex-col">
        <a href="mailto:joyceshidesign@gmail.com" target="_blank" rel="noopener noreferrer">
          joyceshidesign@gmail.com
        </a>
        <a href="https://drive.google.com/file/d/1PItNqPCMpBB5bFmDLqDpwux05vBWqp4V/view" target="_blank" rel="noopener noreferrer">
          CV
        </a>
      </div>
    </footer>
  );
}
