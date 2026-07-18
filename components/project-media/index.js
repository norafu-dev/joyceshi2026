import Image from "next/image";

const DEFAULT_VIDEO_ASPECT_RATIO = "16 / 9";

export default function ProjectMedia({ media, title = "", priority = false }) {
  const videoUrl = media?.video?.file?.asset?.url;
  const posterUrl = media?.video?.thumbnail?.asset?.url;
  const image = media?.image;
  const imageUrl = image?.asset?.url;
  const dimensions = image?.asset?.metadata?.dimensions;

  if (videoUrl) {
    return (
      <video
        aria-label={title || "Project video"}
        autoPlay
        className="block h-auto w-full object-cover"
        loop
        muted
        playsInline
        poster={posterUrl}
        preload="metadata"
        src={videoUrl}
        style={{ aspectRatio: formatAspectRatio(media.video.aspectRatio) }}
      >
        Your browser does not support the video tag.
      </video>
    );
  }

  if (imageUrl) {
    return (
      <Image
        alt={image.alt || title}
        className="block h-auto w-full"
        height={dimensions?.height || 1}
        placeholder={image.asset?.metadata?.lqip ? "blur" : "empty"}
        blurDataURL={image.asset?.metadata?.lqip}
        preload={priority}
        sizes="(min-width: 768px) 42vw, 100vw"
        src={imageUrl}
        width={dimensions?.width || 1}
      />
    );
  }

  return <div aria-hidden="true" className="aspect-[4/3] w-full bg-gray" />;
}

function formatAspectRatio(value) {
  if (typeof value !== "string") {
    return DEFAULT_VIDEO_ASPECT_RATIO;
  }

  const [width, height] = value.split(":").map(Number);

  if (!width || !height) {
    return DEFAULT_VIDEO_ASPECT_RATIO;
  }

  return `${width} / ${height}`;
}
