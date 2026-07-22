"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import gsap from "gsap";
import { datedSections, DatedSection, TextSection } from "./sections";
import { portableTextComponents } from "./portable-text";

export default function AboutOverlay({ about, open, onClose, onExited }) {
  const overlayRef = useRef(null);
  const lineRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const line = lineRef.current;

    timelineRef.current?.kill();

    if (open) {
      gsap.set(overlay, {
        clipPath: "inset(0 0 100% 0)",
        pointerEvents: "auto",
      });
      gsap.set(line, { autoAlpha: 0 });

      timelineRef.current = gsap
        .timeline()
        .to(overlay, {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.05,
          ease: "power3.inOut",
        })
        .to(
          line,
          {
            autoAlpha: 1,
            duration: 0.75,
            ease: "power2.out",
          },
          0.12,
        );
    } else {
      timelineRef.current = gsap
        .timeline({
          onComplete: onExited,
        })
        .to(
          line,
          {
            autoAlpha: 0,
            duration: 0.75,
            ease: "power2.out",
          },
          0,
        )
        .to(overlay, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.95,
          ease: "power3.inOut",
        }, 0)
        .set(overlay, { pointerEvents: "none" });
    }

    return () => {
      timelineRef.current?.kill();
    };
  }, [onExited, open]);

  return (
    <div
      className="about-page fixed inset-0 z-10 overflow-hidden bg-white p-3 text-gray"
      ref={overlayRef}
    >
      <div aria-hidden="true" className="about-divider" ref={lineRef} />

      <div className="about-page-content container h-full min-h-0 overflow-hidden">
        <section className="col-start-1 col-span-12 row-start-1 flex h-full flex-col pt-[calc(var(--site-nav-height)+24px)]">
          <div>
            {about?.bio ? (
              <PortableText
                components={portableTextComponents}
                value={about.bio}
              />
            ) : null}
          </div>
        </section>

        <nav className="container pointer-events-none col-start-1 col-span-24 row-start-1 self-end">
          <Link
            className="pointer-events-auto col-span-3 justify-self-start text-black underline"
            href="/"
            onClick={onClose}
          >
            Return to work
          </Link>
          <Link
            className="pointer-events-auto col-start-4 text-black underline"
            href="/archive"
            onClick={onClose}
          >
            Archive
          </Link>
        </nav>

        <aside className="about-scroll col-start-18 col-span-7 row-start-1 h-full overflow-y-auto pb-4 pt-[calc(var(--site-nav-height)+90px)]">
          {datedSections.map((section) => (
            <DatedSection
              items={about?.[section.field]}
              key={section.field}
              title={section.title}
            />
          ))}

          <TextSection
            title="Clients & Collaborators"
            value={about?.clientsCollaborators}
          />
        </aside>
      </div>
    </div>
  );
}
