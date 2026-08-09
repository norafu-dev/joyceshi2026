import AnimatedImage, {
  AnimatedImageSequence,
} from "@/components/animated-image";
import ProjectMedia from "./media";
import { LEGACY_PROJECT_DETAIL_ROW_NAMES } from "@/sanity/lib/queries";

export default function ProjectDetailGallery({ project }) {
  const rows = getProjectRows(project);
  let nextImageSequenceIndex = 0;

  return (
    <AnimatedImageSequence>
      <section className="project-detail-gallery" aria-label="Project media">
        {rows.map(({ name, media }) => (
          <div
            className={`project-detail-row ${media.length === 1 ? "project-detail-row-single" : "project-detail-row-double"}`}
            key={name}
          >
            {media.map((item, itemIndex) => {
              const itemKey = item._key || `${name}-${itemIndex}`;
              const hasVideo = Boolean(item.video?.file?.asset?.url);
              const sequenceIndex = hasVideo ? undefined : nextImageSequenceIndex++;

              return (
                <figure className="project-detail-media" key={itemKey}>
                  {hasVideo ? (
                    <ProjectMedia media={item} title={project.title} />
                  ) : (
                    <ProjectDetailImage
                      item={item}
                      priority={nextImageSequenceIndex <= 2}
                      sequenceIndex={sequenceIndex}
                      sizes={
                        media.length === 1
                          ? "(min-width: 1000px) 75vw, 100vw"
                          : "(min-width: 1000px) 38vw, 100vw"
                      }
                      title={project.title}
                    />
                  )}
                </figure>
              );
            })}
          </div>
        ))}
      </section>
    </AnimatedImageSequence>
  );
}

function ProjectDetailImage({ item, priority, sequenceIndex, sizes, title }) {
  const image = item.image;
  const imageUrl = image?.asset?.url;

  if (!imageUrl) {
    return <div aria-hidden="true" className="aspect-[4/3] w-full bg-gray" />;
  }

  const dimensions = image.asset?.metadata?.dimensions;

  return (
    <AnimatedImage
      alt={image.alt || title || ""}
      blurDataURL={image.asset?.metadata?.lqip}
      height={dimensions?.height || 1}
      imageClassName="block h-auto w-full"
      loading={priority ? "eager" : "lazy"}
      placeholder={image.asset?.metadata?.lqip ? "blur" : "empty"}
      sizes={sizes}
      src={imageUrl}
      sequenceIndex={sequenceIndex}
      width={dimensions?.width || 1}
    />
  );
}

function getProjectRows(project) {
  const rows = (project?.rows || [])
    .map((row, index) => ({
      name: row._key || `row-${index + 1}`,
      media: (row.items || []).map(normalizeProjectMedia).filter(hasMedia),
    }))
    .filter((row) => row.media.length > 0);

  if (rows.length > 0) {
    return rows;
  }

  return LEGACY_PROJECT_DETAIL_ROW_NAMES.map((name) => ({
    name,
    media: (project?.[name] || []).filter(hasMedia),
  })).filter((row) => row.media.length > 0);
}

function normalizeProjectMedia(item) {
  if (item?._type === "projectVideo") {
    return {
      _key: item._key,
      video: {
        autoplay: item.autoplay,
        aspectRatio: item.aspectRatio,
        file: item.file,
        thumbnail: item.thumbnail,
      },
    };
  }

  return item;
}

function hasMedia(item) {
  return Boolean(
    item?.video?.file?.asset?.url ||
    item?.image?.asset?.url,
  );
}
