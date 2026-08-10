"use client";

import { useLayoutEffect, useRef, useState } from "react";

const PAGE_BOTTOM_ENTER_THRESHOLD = 2;
const PAGE_BOTTOM_EXIT_THRESHOLD = 12;
const DESKTOP_MEDIA_QUERY = "(min-width: 62.5rem)";
const VIEWPORT_MODE_DEBOUNCE_MS = 120;

export default function ProjectCounter({ total }) {
  const atPageBottomRef = useRef(false);
  const counterRef = useRef(null);
  const currentRowRef = useRef(-1);
  const frameRef = useRef(null);
  const [current, setCurrent] = useState(1);
  const [isDesktopViewport, setIsDesktopViewport] = useState(null);

  useLayoutEffect(() => {
    const desktopMedia = window.matchMedia(DESKTOP_MEDIA_QUERY);
    let resizeTimer = null;

    const syncViewportMode = () => {
      setIsDesktopViewport((previousMode) =>
        previousMode === desktopMedia.matches
          ? previousMode
          : desktopMedia.matches,
      );
    };

    const handleViewportChange = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(
        syncViewportMode,
        VIEWPORT_MODE_DEBOUNCE_MS,
      );
    };

    syncViewportMode();
    desktopMedia.addEventListener("change", handleViewportChange);

    return () => {
      window.clearTimeout(resizeTimer);
      desktopMedia.removeEventListener("change", handleViewportChange);
    };
  }, []);

  useLayoutEffect(() => {
    if (isDesktopViewport === null) {
      return undefined;
    }

    const counter = counterRef.current;
    const grid = counter?.closest(".category-project-grid");

    if (!counter || !grid) {
      return undefined;
    }

    if (!isDesktopViewport) {
      const phoneMedia = window.matchMedia("(max-width: 42.499rem)");
      const siteNav = document.querySelector("body > nav");
      const projectCards = Array.from(
        grid.querySelectorAll(".category-project-card"),
      );
      let disposed = false;

      if (!projectCards.length) {
        return undefined;
      }

      const updateMobileCurrent = () => {
        const fixedCounterTop =
          projectCards[0].getBoundingClientRect().bottom +
          window.scrollY +
          (phoneMedia.matches ? 20 : 35);
        const visualRows = [];

        projectCards.forEach((projectCard) => {
          const cardRect = projectCard.getBoundingClientRect();
          const currentRow = visualRows.at(-1);

          if (currentRow && Math.abs(currentRow.top - cardRect.top) < 2) {
            currentRow.bottom = Math.max(currentRow.bottom, cardRect.bottom);
            return;
          }

          visualRows.push({
            top: cardRect.top,
            bottom: cardRect.bottom,
          });
        });

        let counterTop = fixedCounterTop;

        if (visualRows.length > 1) {
          const previousRow = visualRows.at(-2);
          const lastRow = visualRows.at(-1);
          const lastGapTop =
            previousRow.bottom +
            (lastRow.top - previousRow.bottom - counter.offsetHeight) / 2;

          counterTop = Math.min(fixedCounterTop, lastGapTop);
        }

        counter.style.setProperty(
          "--category-project-counter-top",
          `${counterTop}px`,
        );
        counter.style.visibility = "visible";

        const counterRect = counter.getBoundingClientRect();
        const counterLine = counterRect.top + counterRect.height / 2;
        let nextCurrent = 1;

        projectCards.forEach((projectCard) => {
          if (projectCard.getBoundingClientRect().top <= counterLine) {
            nextCurrent = Number(projectCard.dataset.projectIndex) + 1;
          }
        });

        const distanceFromPageBottom = Math.max(
          0,
          document.documentElement.scrollHeight -
            (window.scrollY + window.innerHeight),
        );
        const isAtPageBottom = atPageBottomRef.current
          ? distanceFromPageBottom <= PAGE_BOTTOM_EXIT_THRESHOLD
          : distanceFromPageBottom <= PAGE_BOTTOM_ENTER_THRESHOLD;

        atPageBottomRef.current = isAtPageBottom;

        if (isAtPageBottom) {
          nextCurrent = total;
        }

        setCurrent((previousCurrent) =>
          previousCurrent === nextCurrent ? previousCurrent : nextCurrent,
        );
      };

      const scheduleMobileUpdate = () => {
        if (frameRef.current !== null) {
          return;
        }

        frameRef.current = window.requestAnimationFrame(() => {
          frameRef.current = null;
          updateMobileCurrent();
        });
      };

      updateMobileCurrent();
      window.addEventListener("scroll", scheduleMobileUpdate, {
        passive: true,
      });
      window.addEventListener("resize", scheduleMobileUpdate);

      const resizeObserver = new ResizeObserver(scheduleMobileUpdate);
      resizeObserver.observe(grid);
      if (siteNav) {
        resizeObserver.observe(siteNav);
      }
      projectCards.forEach((projectCard) =>
        resizeObserver.observe(projectCard),
      );

      document.fonts?.ready.then(() => {
        if (!disposed) {
          scheduleMobileUpdate();
        }
      });

      return () => {
        disposed = true;
        window.removeEventListener("scroll", scheduleMobileUpdate);
        window.removeEventListener("resize", scheduleMobileUpdate);
        resizeObserver.disconnect();
        counter.style.removeProperty("--category-project-counter-top");
        counter.style.removeProperty("visibility");

        if (frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
        }
      };
    }

    const rows = Array.from(grid.querySelectorAll(".category-project-row"));

    if (!rows.length) {
      return undefined;
    }

    let anchorY = 0;

    const updateCurrent = () => {
      const gridRect = grid.getBoundingClientRect();
      let currentRow = 0;

      rows.forEach((row, index) => {
        const rowRect = row.getBoundingClientRect();
        const rowCenter = rowRect.top + rowRect.height / 2;

        if (rowCenter <= anchorY + 1) {
          currentRow = index;
        }
      });

      counter.style.visibility =
        gridRect.top <= anchorY && gridRect.bottom >= anchorY
          ? "visible"
          : "hidden";

      if (currentRow !== currentRowRef.current) {
        currentRowRef.current = currentRow;
        setCurrent(Math.min((currentRow + 1) * 2, total));
      }
    };

    const updateLayout = () => {
      counter.style.position = "absolute";
      counter.style.top = "50%";
      const counterRect = counter.getBoundingClientRect();

      anchorY = counterRect.top + counterRect.height / 2 + window.scrollY;
      counter.style.position = "fixed";
      counter.style.top = `${anchorY}px`;
      updateCurrent();
    };

    const scheduleCurrentUpdate = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateCurrent();
      });
    };

    const scheduleLayoutUpdate = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateLayout();
      });
    };

    updateLayout();
    window.addEventListener("scroll", scheduleCurrentUpdate, { passive: true });
    window.addEventListener("resize", scheduleLayoutUpdate);

    const resizeObserver = new ResizeObserver(scheduleLayoutUpdate);
    resizeObserver.observe(grid);
    rows.forEach((row) => resizeObserver.observe(row));

    return () => {
      window.removeEventListener("scroll", scheduleCurrentUpdate);
      window.removeEventListener("resize", scheduleLayoutUpdate);
      resizeObserver.disconnect();
      counter.style.removeProperty("position");
      counter.style.removeProperty("top");
      counter.style.removeProperty("visibility");

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isDesktopViewport, total]);

  return (
    <div
      aria-label={`${current} of ${total}`}
      className="category-project-count"
      ref={counterRef}
    >
      {current}/{total}
    </div>
  );
}
