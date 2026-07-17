"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

const AnimatedImageSequenceContext = createContext(null);

export function AnimatedImageSequence({ children }) {
  const readyRevealsRef = useRef(new Map());
  const nextIndexRef = useRef(0);
  const isPlayingRef = useRef(false);

  const flushQueue = useCallback(() => {
    if (isPlayingRef.current) {
      return;
    }

    const nextReveal = readyRevealsRef.current.get(nextIndexRef.current);

    if (!nextReveal) {
      return;
    }

    isPlayingRef.current = true;
    readyRevealsRef.current.delete(nextIndexRef.current);

    nextReveal().finally(() => {
      nextIndexRef.current += 1;
      isPlayingRef.current = false;
      flushQueue();
    });
  }, []);

  const queueReveal = useCallback((index, reveal) => {
    readyRevealsRef.current.set(index, reveal);
    flushQueue();

    return () => {
      readyRevealsRef.current.delete(index);
    };
  }, [flushQueue]);

  const value = useMemo(() => ({ queueReveal }), [queueReveal]);

  return (
    <AnimatedImageSequenceContext.Provider value={value}>
      {children}
    </AnimatedImageSequenceContext.Provider>
  );
}

export default function AnimatedImage({
  className = "",
  imageClassName = "",
  duration = 0.22,
  delay = 0,
  ease = "power1.out",
  onError,
  onLoad,
  sequenceIndex,
  staggerIndex = 0,
  staggerStep = 0.12,
  style,
  ...imageProps
}) {
  const sequence = useContext(AnimatedImageSequenceContext);
  const imageRef = useRef(null);
  const queuedRevealCleanupRef = useRef(null);
  const hasQueuedRef = useRef(false);
  const timelineRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  const reveal = useCallback((timelineDelay = delay + staggerIndex * staggerStep) => {
    const image = imageRef.current;

    if (!image || hasAnimatedRef.current) {
      return Promise.resolve();
    }

    hasAnimatedRef.current = true;
    setHasRevealed(true);
    timelineRef.current?.kill();

    return new Promise((resolve) => {
      timelineRef.current = gsap
        .timeline({
          delay: timelineDelay,
        })
        .fromTo(image, {
          autoAlpha: 0,
        }, {
          autoAlpha: 1,
          duration,
          ease,
        });

      window.setTimeout(resolve, Math.max(duration * 0.55, 0.08) * 1000);
    });
  }, [delay, duration, ease, staggerIndex, staggerStep]);

  const queueOrReveal = useCallback(() => {
    if (hasQueuedRef.current) {
      return;
    }

    hasQueuedRef.current = true;

    if (sequence && Number.isFinite(sequenceIndex)) {
      queuedRevealCleanupRef.current = sequence.queueReveal(sequenceIndex, () => reveal(0));
      return;
    }

    reveal();
  }, [reveal, sequence, sequenceIndex]);

  useEffect(() => {
    const image = imageRef.current;

    if (image?.complete) {
      queueOrReveal();
    }

    const fallbackTimer = window.setTimeout(queueOrReveal, 1200);

    return () => {
      window.clearTimeout(fallbackTimer);
      queuedRevealCleanupRef.current?.();
      timelineRef.current?.kill();

      if (!hasAnimatedRef.current) {
        hasQueuedRef.current = false;
        queuedRevealCleanupRef.current = null;
      }
    };
  }, [queueOrReveal]);

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <Image
        {...imageProps}
        className={imageClassName}
        onError={(event) => {
          onError?.(event);
          queueOrReveal();
        }}
        onLoad={(event) => {
          onLoad?.(event);
          queueOrReveal();
        }}
        ref={imageRef}
        style={hasRevealed ? style : { ...style, opacity: 0, visibility: "hidden" }}
      />
    </span>
  );
}
