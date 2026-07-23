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
const DEFAULT_REVEAL_DURATION = 0.48;
const DEFAULT_REVEAL_EASE = "power2.out";
const REVEAL_QUEUE_PROGRESS = 0.42;
const VIDEO_PLAY_DELAY = 80;

export function AnimatedImageSequence({ children }) {
  const readyRevealsRef = useRef(new Map());
  const nextIndexRef = useRef(0);
  const isPlayingRef = useRef(false);

  const flushQueue = useCallback(function processQueue() {
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
      processQueue();
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
  alt = "",
  className = "",
  imageClassName = "",
  duration = DEFAULT_REVEAL_DURATION,
  delay = 0,
  ease = DEFAULT_REVEAL_EASE,
  onError,
  onLoad,
  sequenceIndex,
  staggerIndex = 0,
  staggerStep = 0.12,
  style,
  ...imageProps
}) {
  const imageRef = useRef(null);
  const { hasRevealed, queueOrReveal } = useMediaReveal({
    delay,
    duration,
    ease,
    mediaRef: imageRef,
    sequenceIndex,
    staggerIndex,
    staggerStep,
  });

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <Image
        {...imageProps}
        alt={alt}
        className={imageClassName}
        quality={100}
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

export function AnimatedVideo({
  className = "",
  videoClassName = "",
  duration = DEFAULT_REVEAL_DURATION,
  delay = 0,
  ease = DEFAULT_REVEAL_EASE,
  onCanPlay,
  onError,
  onLoadedData,
  sequenceIndex,
  staggerIndex = 0,
  staggerStep = 0.12,
  style,
  ...videoProps
}) {
  const videoRef = useRef(null);
  const playTimerRef = useRef(null);
  const playAfterReveal = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    window.clearTimeout(playTimerRef.current);
    playTimerRef.current = window.setTimeout(() => {
      const playPromise = videoRef.current?.play();

      playPromise?.catch(() => {
        // Muted inline video should autoplay, but browsers may still reject it.
      });
    }, VIDEO_PLAY_DELAY);
  }, []);
  const { hasRevealed, queueOrReveal } = useMediaReveal({
    delay,
    duration,
    ease,
    mediaRef: videoRef,
    onRevealComplete: playAfterReveal,
    sequenceIndex,
    staggerIndex,
    staggerStep,
  });

  useEffect(() => {
    return () => {
      window.clearTimeout(playTimerRef.current);
    };
  }, []);

  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <video
        {...videoProps}
        autoPlay={false}
        className={videoClassName}
        onCanPlay={(event) => {
          onCanPlay?.(event);
          queueOrReveal();
        }}
        onError={(event) => {
          onError?.(event);
          queueOrReveal();
        }}
        onLoadedData={(event) => {
          onLoadedData?.(event);
          queueOrReveal();
        }}
        ref={videoRef}
        style={hasRevealed ? style : { ...style, opacity: 0, visibility: "hidden" }}
      />
    </span>
  );
}

function useMediaReveal({
  delay,
  duration,
  ease,
  mediaRef,
  onRevealComplete,
  sequenceIndex,
  staggerIndex,
  staggerStep,
}) {
  const sequence = useContext(AnimatedImageSequenceContext);
  const queuedRevealCleanupRef = useRef(null);
  const hasQueuedRef = useRef(false);
  const timelineRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const onRevealCompleteRef = useRef(onRevealComplete);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    onRevealCompleteRef.current = onRevealComplete;
  }, [onRevealComplete]);

  const reveal = useCallback((timelineDelay = delay + staggerIndex * staggerStep) => {
    const media = mediaRef.current;

    if (!media || hasAnimatedRef.current) {
      return Promise.resolve();
    }

    hasAnimatedRef.current = true;
    setHasRevealed(true);
    timelineRef.current?.kill();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(media, {
        autoAlpha: 1,
      });
      onRevealCompleteRef.current?.();
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      timelineRef.current = gsap
        .timeline({
          delay: timelineDelay,
          onComplete: () => {
            onRevealCompleteRef.current?.();
          },
        })
        .fromTo(media, {
          autoAlpha: 0,
        }, {
          autoAlpha: 1,
          duration,
          ease,
        });

      window.setTimeout(resolve, Math.max(duration * REVEAL_QUEUE_PROGRESS, 0.12) * 1000);
    });
  }, [delay, duration, ease, mediaRef, staggerIndex, staggerStep]);

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
    const media = mediaRef.current;

    if (media?.complete || media?.readyState >= 2) {
      queueOrReveal();
    }

    const fallbackTimer = window.setTimeout(queueOrReveal, 1200);

    return () => {
      window.clearTimeout(fallbackTimer);
      queuedRevealCleanupRef.current?.();

      if (!hasAnimatedRef.current) {
        hasQueuedRef.current = false;
        queuedRevealCleanupRef.current = null;
      }
    };
  }, [mediaRef, queueOrReveal]);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  return { hasRevealed, queueOrReveal };
}
