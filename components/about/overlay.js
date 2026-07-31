"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import gsap from "gsap";
import BackToTopIcon from "@/components/back-to-top-icon";
import NavContactLinks from "@/components/nav/contact-links";
import { datedSections, DatedSection, TextSection } from "./sections";
import { portableTextComponents } from "./portable-text";

export default function AboutOverlay({
  about,
  animateMobileClosePlus = true,
  open,
  onClose,
  onExited,
}) {
  const overlayRef = useRef(null);
  const lineRef = useRef(null);
  const mobileScrollRef = useRef(null);
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

  const handleBackToTop = () => {
    mobileScrollRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="about-page fixed inset-0 z-30 overflow-hidden bg-white p-0 text-gray tablet:z-10 tablet:px-3 tablet:pt-3"
      ref={overlayRef}
    >
      <div
        aria-hidden="true"
        className="about-divider hidden tablet:block"
        ref={lineRef}
      />

      <div className="about-page-content container hidden h-full min-h-0 overflow-hidden tablet:grid">
        <section className="col-start-1 col-span-11 row-start-1 flex h-full flex-col pt-[calc(var(--site-nav-height)+24px)] desktop:col-span-12">
          <div>
            {about?.bio ? (
              <PortableText
                components={portableTextComponents}
                value={about.bio}
              />
            ) : null}
          </div>
        </section>

        <nav className="container pointer-events-none col-start-1 col-span-24 row-start-1 self-end pb-3">
          <Link
            className="pointer-events-auto col-span-3 justify-self-start text-black underline"
            href="/"
            onClick={onClose}
          >
            Return
          </Link>
          <Link
            className="pointer-events-auto col-start-4 text-black underline"
            href="/archive"
            onClick={onClose}
          >
            Archive
          </Link>
        </nav>

        <aside className="about-scroll col-start-14 col-span-7 row-start-1 h-full overflow-y-auto overscroll-y-contain pb-4 tablet:col-span-11 desktop:col-start-18 desktop:col-span-7">
          <nav
            aria-label="Contact links"
            className="about-scroll-contact grid grid-cols-11 gap-x-1 text-black desktop:grid-cols-7"
          >
            <NavContactLinks layout="about" />
          </nav>

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

      <div
        className="about-mobile-scroll h-full overflow-y-auto tablet:hidden"
        ref={mobileScrollRef}
      >
        <section className="about-mobile-intro">
          <MobileAboutHeader
            animateClosePlus={animateMobileClosePlus}
            onNavigate={onClose}
            open={open}
          />

          <div className="about-mobile-bio">
            {about?.bio ? (
              <PortableText
                components={portableTextComponents}
                value={about.bio}
              />
            ) : null}
          </div>
        </section>

        <MobileContactNav />

        <div className="about-mobile-details">
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
        </div>

        <nav className="about-mobile-footer text-black">
          <button
            className="justify-self-start"
            onClick={handleBackToTop}
            type="button"
          >
            Back to top <BackToTopIcon />
          </button>
          <Link
            className="justify-self-start underline"
            href="/"
            onClick={onClose}
          >
            Return
          </Link>
          <Link
            className="justify-self-end underline"
            href="/archive"
            onClick={onClose}
          >
            Archive
          </Link>
        </nav>
      </div>
    </div>
  );
}

function MobileAboutHeader({ animateClosePlus, onNavigate, open }) {
  return (
    <header className="about-mobile-header">
      <button
        className="text-purple"
        onClick={onNavigate}
        type="button"
      >
        Joyce Shi{" "}
      </button>
      <span>
        {" "}is an award-winning design director & independent publisher based in
        New York working across{" "}
      </span>
      <Link
        className="text-black underline"
        href="/brand-campaign-system"
        onClick={onNavigate}
      >
        brand & campaign system
      </Link>
      <span>, </span>
      <Link
        className="text-black underline"
        href="/print-editorial-design"
        onClick={onNavigate}
      >
        print & editorial design
      </Link>
      <span> and </span>
      <span className="nav-ending">
        <Link
          className="text-black underline"
          href="/digital-design"
          onClick={onNavigate}
        >
          digital design
        </Link>
        <span>.</span>
        <span
          aria-hidden="true"
          className={`nav-plus about-mobile-close-plus text-black ${!open && animateClosePlus ? "nav-plus-returning" : ""}`}
        />
      </span>
    </header>
  );
}

function MobileContactNav() {
  return (
    <nav
      aria-label="Contact links"
      className="about-mobile-contact-nav text-black"
    >
      <a href="mailto:joyceshidesign@gmail.com">email</a>
      <a
        href="https://www.instagram.com/gloamaxis/?igshid=YmMyMTA2M2Y%3D"
        rel="noopener noreferrer"
        target="_blank"
      >
        Instagram
      </a>
      <a
        href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGNWLSerqeJMgAAAZ9foGzoYoxpxz3iECS684sBRXnGjFvtpmFfe6ayL8q-pqrkG12S0xWPYvpXq3TK-KZFi9dqO-tPUzp9PFkA_tAPzmJGt-gSu49Hod6vicm0lbNg9rkgPmI=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fjoyce-shi-553272167"
        rel="noopener noreferrer"
        target="_blank"
      >
        LinkedIn
      </a>
      <a
        className="justify-self-end"
        href="https://drive.google.com/file/d/1PItNqPCMpBB5bFmDLqDpwux05vBWqp4V/view"
        rel="noopener noreferrer"
        target="_blank"
      >
        CV
      </a>
    </nav>
  );
}
