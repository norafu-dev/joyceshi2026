"use client";

import { useLayoutEffect, useRef, useState } from "react";

export default function ProjectCounter({ total }) {
  const counterRef = useRef(null);
  const currentRowRef = useRef(-1);
  const frameRef = useRef(null);
  const [current, setCurrent] = useState(1);

  useLayoutEffect(() => {
    const counter = counterRef.current;
    const grid = counter?.closest(".category-project-grid");

    if (!counter || !grid) {
      return undefined;
    }

    if (window.matchMedia("(max-width: 999px)").matches) {
      const phoneMedia = window.matchMedia("(max-width: 42.499rem)");
      const projectCards = Array.from(
        grid.querySelectorAll(".category-project-card"),
      );

      const updateMobileCurrent = () => {
        const counterAnchorTop =
          projectCards[0].getBoundingClientRect().bottom +
          window.scrollY +
          (phoneMedia.matches ? 20 : 35);

        counter.style.setProperty(
          "--category-project-counter-top",
          `${counterAnchorTop}px`,
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

      scheduleMobileUpdate();
      window.addEventListener("scroll", scheduleMobileUpdate, {
        passive: true,
      });
      window.addEventListener("resize", scheduleMobileUpdate);

      const resizeObserver = new ResizeObserver(scheduleMobileUpdate);
      resizeObserver.observe(grid);
      projectCards.forEach((projectCard) =>
        resizeObserver.observe(projectCard),
      );

      return () => {
        window.removeEventListener("scroll", scheduleMobileUpdate);
        window.removeEventListener("resize", scheduleMobileUpdate);
        resizeObserver.disconnect();
        counter.style.removeProperty("--category-project-counter-top");
        counter.style.removeProperty("visibility");

        if (frameRef.current !== null) {
          window.cancelAnimationFrame(frameRef.current);
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

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [total]);

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
