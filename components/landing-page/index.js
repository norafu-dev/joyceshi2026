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
  const animationRef = useRef(null);
  const autoTimerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const isAnimating = useRef(false);
  const lastWheelAt = useRef(0);
  const layerRefs = useRef([]);
  const pendingImageCleanupRef = useRef(null);
  const pendingIndexRef = useRef(null);
  const visibleIndex = slides.length ? currentIndex % slides.length : 0;
  const currentSlide = slides[visibleIndex];

  const clearAutoTimer = useCallback(() => {
    if (autoTimerRef.current === null) {
      return;
    }

    window.clearTimeout(autoTimerRef.current);
    autoTimerRef.current = null;
  }, []);

  const startTransition = useCallback((nextIndex) => {
    const previousIndex = currentIndexRef.current;
    const currentLayer = layerRefs.current[previousIndex];
    const incomingLayer = layerRefs.current[nextIndex];

    pendingImageCleanupRef.current?.();
    pendingImageCleanupRef.current = null;
    pendingIndexRef.current = null;

    if (!currentLayer || !incomingLayer) {
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex);
      isAnimating.current = false;
      return;
    }

    animationRef.current?.kill();
    gsap.set(incomingLayer, { opacity: 0, zIndex: 1 });
    gsap.set(currentLayer, { opacity: 1, zIndex: 0 });

    animationRef.current = gsap
      .timeline({
        defaults: {
          duration: 0.55,
          ease: "power1.inOut",
        },
        onComplete: () => {
          gsap.set(currentLayer, { opacity: 0, zIndex: 0 });
          gsap.set(incomingLayer, { opacity: 1, zIndex: 0 });
          currentIndexRef.current = nextIndex;
          setCurrentIndex(nextIndex);
          isAnimating.current = false;
        },
      })
      .to(incomingLayer, { opacity: 1 }, 0)
      .to(currentLayer, { opacity: 0 }, 0);
  }, []);

  const prepareTransition = useCallback(
    (nextIndex) => {
      const incomingLayer = layerRefs.current[nextIndex];

      if (!incomingLayer) {
        startTransition(nextIndex);
        return;
      }

      const images = Array.from(incomingLayer.querySelectorAll("img"));
      const incomingImage =
        images.find((image) => window.getComputedStyle(image).display !== "none") ??
        images[0];

      if (!incomingImage) {
        startTransition(nextIndex);
        return;
      }

      const startAfterDecode = () => {
        const decode =
          typeof incomingImage.decode === "function"
            ? incomingImage.decode().catch(() => {})
            : Promise.resolve();

        decode.then(() => {
          if (pendingIndexRef.current === nextIndex) {
            startTransition(nextIndex);
          }
        });
      };

      if (incomingImage.complete && incomingImage.naturalWidth > 0) {
        startAfterDecode();
        return;
      }

      const handleLoad = () => startAfterDecode();
      const handleError = () => {
        pendingImageCleanupRef.current?.();
        pendingImageCleanupRef.current = null;
        pendingIndexRef.current = null;
        isAnimating.current = false;
      };

      incomingImage.addEventListener("load", handleLoad, { once: true });
      incomingImage.addEventListener("error", handleError, { once: true });
      pendingImageCleanupRef.current = () => {
        incomingImage.removeEventListener("load", handleLoad);
        incomingImage.removeEventListener("error", handleError);
      };
    },
    [startTransition],
  );

  const showNextSlide = useCallback(() => {
    if (slides.length <= 1 || isAnimating.current) {
      return;
    }

    const nextIndex = (currentIndexRef.current + 1) % slides.length;

    clearAutoTimer();
    isAnimating.current = true;
    pendingIndexRef.current = nextIndex;
    prepareTransition(nextIndex);
  }, [clearAutoTimer, prepareTransition, slides.length]);

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
    clearAutoTimer();

    if (slides.length <= 1) {
      return;
    }

    autoTimerRef.current = window.setTimeout(showNextSlide, 6000);

    return clearAutoTimer;
  }, [clearAutoTimer, currentIndex, showNextSlide, slides.length]);

  useEffect(() => {
    return () => {
      animationRef.current?.kill();
      clearAutoTimer();
      pendingImageCleanupRef.current?.();
      pendingImageCleanupRef.current = null;
      pendingIndexRef.current = null;
    };
  }, [clearAutoTimer]);

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
      {slides.map((slide, index) => (
        <div
          aria-hidden={index !== visibleIndex}
          className={`landing-slide-layer absolute inset-0 ${
            index === 0 ? "opacity-100" : "opacity-0"
          }`}
          key={slide.id}
          ref={(node) => {
            layerRefs.current[index] = node;
          }}
        >
          <LandingSlide preload={index === 0} slide={slide} />
        </div>
      ))}

      {slides.length > 1 ? (
        <button
          type="button"
          aria-label="View next project"
          className="landing-advance absolute inset-0 z-10"
          onClick={showNextSlide}
        />
      ) : null}

      <LandingCaption
        category={currentSlide.category}
        current={visibleIndex + 1}
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

function LandingCaption({ category, current, slug, title, total }) {
  return (
    <div className="landing-caption container pointer-events-none absolute inset-x-3 bottom-3 z-20 text-white">
      <div className="col-span-10 tablet:col-span-11 desktop:col-span-12">
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

      <span className="col-start-11 col-span-2 justify-self-start tablet:col-start-18 tablet:col-span-2 desktop:col-start-20 desktop:col-span-4">
        {current}/{total}
      </span>
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
