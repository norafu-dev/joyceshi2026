"use client";

import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function LandingPage({ projects = [] }) {
  const slides = useMemo(
    () =>
      projects
        .map((project) => {
          const desktopImage = project.landingPageCover?.desktop;
          const mobileImage = project.landingPageCover?.mobile;
          const desktopAsset = desktopImage?.asset;
          const mobileAsset = mobileImage?.asset;

          return {
            id: project._id,
            category: getCategoryValue(project.category),
            slug: project.slug,
            title: project.title,
            desktopUrl: desktopAsset?.url,
            desktopLqip: desktopAsset?.metadata?.lqip,
            desktopAspectRatio:
              desktopAsset?.metadata?.dimensions?.aspectRatio,
            desktopPosition: getObjectPosition(desktopImage),
            mobileUrl: mobileAsset?.url,
            mobileLqip: mobileAsset?.metadata?.lqip,
            mobileAspectRatio:
              mobileAsset?.metadata?.dimensions?.aspectRatio,
            mobilePosition: getObjectPosition(mobileImage),
          };
        })
        .filter((slide) => slide.desktopUrl),
    [projects]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState(null);
  const animationRef = useRef(null);
  const currentLayerRef = useRef(null);
  const incomingLayerRef = useRef(null);
  const isAnimating = useRef(false);
  const lastWheelAt = useRef(0);
  const visibleIndex = slides.length ? currentIndex % slides.length : 0;
  const incomingVisibleIndex =
    incomingIndex === null || !slides.length ? null : incomingIndex % slides.length;
  const currentSlide = slides[visibleIndex];
  const incomingSlide =
    incomingVisibleIndex === null ? null : slides[incomingVisibleIndex];

  const showNextSlide = useCallback(() => {
    if (slides.length <= 1 || isAnimating.current) {
      return;
    }

    const nextIndex = (visibleIndex + 1) % slides.length;

    isAnimating.current = true;
    animationRef.current?.kill();
    setIncomingIndex(nextIndex);

    requestAnimationFrame(() => {
      const currentLayer = currentLayerRef.current;
      const incomingLayer = incomingLayerRef.current;

      if (!currentLayer || !incomingLayer) {
        setCurrentIndex(nextIndex);
        setIncomingIndex(null);
        isAnimating.current = false;
        return;
      }

      gsap.set(incomingLayer, { opacity: 0 });

      animationRef.current = gsap
        .timeline({
          defaults: {
            duration: 0.35,
            ease: "power1.out",
          },
          onComplete: () => {
            gsap.set(currentLayer, { opacity: 1 });
            setCurrentIndex(nextIndex);
            setIncomingIndex(null);
            isAnimating.current = false;
          },
        })
        .to(incomingLayer, { opacity: 1 }, 0)
        .to(currentLayer, { opacity: 0.85, duration: 0.2 }, 0);
    });
  }, [slides.length, visibleIndex]);

  const handleWheel = (event) => {
    if (slides.length <= 1 || Math.abs(event.deltaY) < 20) {
      return;
    }

    const now = Date.now();

    if (now - lastWheelAt.current < 700) {
      return;
    }

    lastWheelAt.current = now;
    showNextSlide();
  };

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const timer = window.setTimeout(showNextSlide, 6000);

    return () => window.clearTimeout(timer);
  }, [currentIndex, showNextSlide, slides.length]);

  useEffect(() => {
    return () => {
      animationRef.current?.kill();
    };
  }, []);

  if (!currentSlide) {
    return (
      <main
        className="landing-page fixed inset-0 z-0 bg-black"
        style={{ backgroundColor: "#000000" }}
      />
    );
  }

  return (
    <main
      className="landing-page fixed inset-0 z-0 overflow-hidden bg-black text-white"
      onWheel={handleWheel}
      style={{ backgroundColor: "#000000" }}
    >
      <div ref={currentLayerRef} className="absolute inset-0 opacity-100">
        <LandingSlide slide={currentSlide} preload={visibleIndex === 0} />
      </div>

      {incomingSlide ? (
        <div ref={incomingLayerRef} className="absolute inset-0 opacity-0">
          <LandingSlide slide={incomingSlide} preload={false} />
        </div>
      ) : null}

      {slides.length > 1 ? (
        <button
          type="button"
          aria-label="View next project"
          className="absolute inset-0 z-10"
          onClick={showNextSlide}
        />
      ) : null}

      <LandingCaption
        category={currentSlide.category}
        current={visibleIndex + 1}
        onNext={showNextSlide}
        slug={currentSlide.slug}
        title={currentSlide.title}
        total={slides.length}
      />
    </main>
  );
}

function LandingSlide({ preload, slide }) {
  const desktopImage = (
    <ResponsiveLandingImage
      aspectRatio={slide.desktopAspectRatio}
      className={slide.mobileUrl ? "hidden desktop:block" : ""}
      lqip={slide.desktopLqip}
      position={slide.desktopPosition}
      preload={preload && !slide.mobileUrl}
      src={slide.desktopUrl}
      title={slide.title}
      useFetchPriority={preload && Boolean(slide.mobileUrl)}
    />
  );

  if (!slide.mobileUrl) {
    return desktopImage;
  }

  return (
    <>
      {desktopImage}
      <ResponsiveLandingImage
        aspectRatio={slide.mobileAspectRatio}
        className="desktop:hidden"
        lqip={slide.mobileLqip}
        position={slide.mobilePosition}
        src={slide.mobileUrl}
        title={slide.title}
        useFetchPriority={preload}
      />
    </>
  );
}

function ResponsiveLandingImage({
  aspectRatio,
  className,
  lqip,
  position,
  preload = false,
  src,
  title,
  useFetchPriority = false,
}) {
  const hasBlurPlaceholder = Boolean(lqip);

  return (
    <Image
      key={src}
      className={`object-cover ${className}`.trim()}
      src={src}
      alt={title || ""}
      blurDataURL={hasBlurPlaceholder ? lqip : undefined}
      fill
      placeholder={hasBlurPlaceholder ? "blur" : "empty"}
      preload={preload}
      quality={100}
      sizes={getCoverSizes(aspectRatio)}
      style={{ objectPosition: position }}
      fetchPriority={useFetchPriority ? "high" : undefined}
    />
  );
}

function LandingCaption({ category, current, onNext, slug, title, total }) {
  return (
    <div className="landing-caption container pointer-events-none absolute inset-x-3 bottom-3 z-20 text-white">
      <div className="col-span-10 desktop:col-span-12">
        {category && slug ? (
          <Link
            className="pointer-events-auto"
            href={`/${category}/${slug}`}
          >
            {title}
          </Link>
        ) : (
          <span>{title}</span>
        )}
      </div>

      <button
        type="button"
        className="pointer-events-auto col-start-11 col-span-2 justify-self-start text-left desktop:col-start-20 desktop:col-span-4"
        onClick={onNext}
      >
        {current}/{total}
      </button>
    </div>
  );
}

function getCategoryValue(category) {
  return Array.isArray(category) ? category[0] : category;
}

function getObjectPosition(image) {
  const x = image?.hotspot?.x ?? 0.5;
  const y = image?.hotspot?.y ?? 0.5;

  return `${x * 100}% ${y * 100}%`;
}

function getCoverSizes(aspectRatio) {
  const safeAspectRatio =
    Number.isFinite(aspectRatio) && aspectRatio > 0 ? aspectRatio : 1;
  const portraitCoverWidth = Math.ceil(safeAspectRatio * 100);

  return `(max-width: 999px) and (orientation: portrait) ${portraitCoverWidth}vh, 100vw`;
}
