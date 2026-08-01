"use client";

import gsap from "gsap";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

const DETAILS_TRANSITION_DURATION = 1.05;

export default function ProjectMobileDetails({
  category,
  nextProject,
  project,
}) {
  const [detailsMounted, setDetailsMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const disclosureRef = useRef(null);
  const openRef = useRef(null);
  const awards = (project.awards || []).filter((item) => item.year || item.award);
  const nextHref = nextProject
    ? `/${category}/${nextProject.slug}`
    : null;

  useLayoutEffect(() => {
    const disclosure = disclosureRef.current;
    const open = openRef.current;

    if (expanded) {
      gsap.set(disclosure, { clearProps: "height,overflow" });
      gsap.set(open, { clearProps: "clipPath,pointerEvents" });
      return undefined;
    }

    if (!detailsMounted || !disclosure || !open) {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const animationFrame = window.requestAnimationFrame(() => {
        setExpanded(true);
      });

      return () => {
        window.cancelAnimationFrame(animationFrame);
      };
    }

    gsap.set(open, {
      clipPath: "inset(0 0 100% 0)",
      pointerEvents: "none",
    });

    const timeline = gsap.timeline({
      onComplete: () => {
        setExpanded(true);
      },
    });

    timeline
      .to(
        disclosure,
        {
          duration: DETAILS_TRANSITION_DURATION,
          ease: "power3.inOut",
          height: open.scrollHeight,
        },
        0,
      )
      .to(
        open,
        {
          clipPath: "inset(0 0 0% 0)",
          duration: DETAILS_TRANSITION_DURATION,
          ease: "power3.inOut",
        },
        0,
      );

    return () => {
      timeline.kill();
    };
  }, [detailsMounted, expanded]);

  const handleExpand = () => {
    const disclosure = disclosureRef.current;

    if (!disclosure || detailsMounted) {
      return;
    }

    gsap.set(disclosure, {
      height: disclosure.getBoundingClientRect().height,
      overflow: "hidden",
    });
    setDetailsMounted(true);
  };

  return (
    <section className="project-mobile-details desktop:hidden">
      <header className="project-mobile-title-row">
        <h1>{project.title}</h1>
        <ProjectMobileActions
          buyHref={project.buy}
          nextHref={nextHref}
          nextTitle={nextProject?.title}
        />
      </header>

      <div
        className={`project-mobile-disclosure ${detailsMounted && !expanded ? "project-mobile-disclosure-animating" : ""} ${expanded ? "project-mobile-disclosure-expanded" : ""}`}
        ref={disclosureRef}
      >
        <div
          aria-hidden={detailsMounted}
          className="project-mobile-disclosure-collapsed"
        >
          <div>
            <button
              aria-expanded={expanded}
              className="project-mobile-read-more text-gray"
              onClick={handleExpand}
              tabIndex={detailsMounted ? -1 : undefined}
              type="button"
            >
              <span>{project.year}</span>
              <span>
                Read about the project
                <span aria-hidden="true" className="nav-plus" />
              </span>
            </button>
          </div>
        </div>

        {detailsMounted ? (
          <div
            aria-hidden={!expanded}
            className="project-mobile-disclosure-open"
            ref={openRef}
          >
            <div>
              <div className="project-mobile-information">
                {project.year || project.description ? (
                  <div className="project-mobile-information-row text-gray">
                    <p>{project.year}</p>
                    <p className="whitespace-pre-line">{project.description}</p>
                  </div>
                ) : null}

                {awards.length ? (
                  <div className="project-mobile-awards text-gray">
                    {awards.map((item, index) => (
                      <div
                        className="project-mobile-information-row"
                        key={item._key || `${item.year}-${index}`}
                      >
                        <p>{item.year}</p>
                        <p className="whitespace-pre-line">{item.award}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function ProjectMobileActions({
  buyHref,
  nextHref,
  nextTitle,
}) {
  return (
    <nav className="project-mobile-actions" aria-label="Project navigation">
      {buyHref ? (
        <a
          className="text-purple underline"
          href={buyHref}
          rel="noopener noreferrer"
          target="_blank"
        >
          Buy
        </a>
      ) : null}
      {buyHref && nextHref ? <span aria-hidden="true"> / </span> : null}
      {nextHref ? (
        <Link
          aria-label={`Next project: ${nextTitle || "View project"}`}
          className="underline"
          href={nextHref}
        >
          Next
        </Link>
      ) : null}
    </nav>
  );
}
