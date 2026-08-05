"use client";

import { useCallback, useRef, useState } from "react";

export default function ProjectDetailVideo({
  aspectRatio,
  autoplay = false,
  poster,
  src,
  title = "",
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoSrc = getVideoSrc({ autoplay, poster, src });

  const handlePlayClick = useCallback(() => {
    const playPromise = videoRef.current?.play();

    playPromise?.catch(() => {
      setIsPlaying(false);
    });
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio }}
    >
      <video
        aria-label={title || "Project video"}
        autoPlay={autoplay}
        className="block h-full w-full object-cover"
        controls={!autoplay && isPlaying}
        loop
        muted={autoplay}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        playsInline
        poster={poster}
        preload={autoplay ? "auto" : "metadata"}
        ref={videoRef}
        src={videoSrc}
      >
        Your browser does not support the video tag.
      </video>

      {!autoplay && !isPlaying ? (
        <button
          aria-label={`Play ${title || "project video"}`}
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0"
          onClick={handlePlayClick}
          type="button"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/70 text-white shadow-lg transition-all hover:scale-105 hover:bg-black/90 tablet:h-20 tablet:w-20 desktop:h-24 desktop:w-24">
            <svg
              aria-hidden="true"
              className="ml-1 h-8 w-8 tablet:h-10 tablet:w-10 desktop:h-12 desktop:w-12"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      ) : null}
    </div>
  );
}

function getVideoSrc({ autoplay, poster, src }) {
  if (autoplay || poster || !src || src.includes("#")) {
    return src;
  }

  // iOS/iPadOS Safari may leave paused videos blank without a poster.
  // A tiny media-fragment offset makes WebKit request and paint the first frame.
  return `${src}#t=0.001`;
}
