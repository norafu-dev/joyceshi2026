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
          const desktopUrl = project.landingPageCover?.desktop?.asset?.url;

          return {
            id: project._id,
            category: getCategoryValue(project.category),
            slug: project.slug,
            title: project.title,
            desktopUrl,
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
    return <main className="landing-page fixed inset-0 z-0 bg-black" />;
  }

  return (
    <main
      className="landing-page fixed inset-0 z-0 overflow-hidden bg-black text-white"
      onWheel={handleWheel}
    >
      <div ref={currentLayerRef} className="absolute inset-0 opacity-100">
        <LandingSlide slide={currentSlide} priority={visibleIndex === 0} />
      </div>

      {incomingSlide ? (
        <div ref={incomingLayerRef} className="absolute inset-0 opacity-0">
          <LandingSlide slide={incomingSlide} priority={false} />
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

function LandingSlide({ priority, slide }) {
  return (
    <Image
      key={slide.desktopUrl}
      className="object-cover"
      src={slide.desktopUrl}
      alt={slide.title || ""}
      fill
      priority={priority}
      sizes="100vw"
    />
  );
}

function LandingCaption({ category, current, onNext, slug, title, total }) {
  return (
    <div className="container pointer-events-none absolute inset-x-3 bottom-3 z-20 text-white">
      <div className="col-span-12">
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
        className="pointer-events-auto col-start-20 col-span-4 justify-self-start text-left"
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
