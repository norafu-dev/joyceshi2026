"use client";

import { useLayoutEffect, useRef, useState } from "react";

export default function ProjectCounter({ total }) {
  const counterRef = useRef(null);
  const currentRowRef = useRef(0);
  const frameRef = useRef(null);
  const [current, setCurrent] = useState(Math.min(2, total));

  useLayoutEffect(() => {
    const counter = counterRef.current;
    const grid = counter?.closest(".category-project-grid");

    if (!counter || !grid) {
      return undefined;
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
