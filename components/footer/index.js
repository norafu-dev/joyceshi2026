"use client";

import BackToTopIcon from "@/components/back-to-top-icon";
import Link from "next/link";

export default function SiteFooter({
  mobileBuyHref,
  mobileNextHref,
  mobileNextTitle,
  scrollContainerSelector,
  secondaryHref = "/archive",
  secondaryLabel = "Archive",
  topHref = "#page-top",
}) {
  const handleBackToTop = (event) => {
    event.preventDefault();
    const scrollContainer = scrollContainerSelector
      ? document.querySelector(scrollContainerSelector)
      : null;
    const hasIndependentScroll =
      scrollContainer &&
      scrollContainer.scrollHeight > scrollContainer.clientHeight + 1 &&
      ["auto", "scroll"].includes(
        window.getComputedStyle(scrollContainer).overflowY,
      );

    if (hasIndependentScroll) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="site-footer site-footer-mobile container desktop:hidden">
        <nav
          aria-label="Contact links"
          className="site-footer-mobile-contact"
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
            href="https://www.linkedin.com/in/joyce-shi-553272167"
            rel="noopener noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            href="https://drive.google.com/file/d/1PItNqPCMpBB5bFmDLqDpwux05vBWqp4V/view"
            rel="noopener noreferrer"
            target="_blank"
          >
            CV
          </a>
        </nav>

        <div className="site-footer-mobile-actions">
          <a href={topHref} onClick={handleBackToTop}>
            Back to top <BackToTopIcon />
          </a>
          {mobileNextHref ? (
            <span className="site-footer-mobile-project-links">
              {mobileBuyHref ? (
                <>
                  <a
                    className="text-purple underline"
                    href={mobileBuyHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Buy
                  </a>
                  <span aria-hidden="true"> / </span>
                </>
              ) : null}
              <Link
                aria-label={`Next project: ${mobileNextTitle || "View project"}`}
                className="underline"
                href={mobileNextHref}
              >
                Next
              </Link>
            </span>
          ) : (
            <Link className="justify-self-end underline" href={secondaryHref}>
              {secondaryLabel}
            </Link>
          )}
        </div>
      </footer>

      <footer className="site-footer site-footer-desktop container col-span-24">
      <div className="col-span-3 self-end">
        <a href={topHref} onClick={handleBackToTop}>
          Back to top <BackToTopIcon />
        </a>
      </div>

      <div className="col-start-4 col-span-3 self-end">
        <Link className="underline" href={secondaryHref}>
          {secondaryLabel}
        </Link>
      </div>

      <div className="col-start-18 col-span-2 flex flex-col">
        <a href="https://www.instagram.com/gloamaxis/?igshid=YmMyMTA2M2Y%3D" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://www.linkedin.com/in/joyce-shi-553272167" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>

      <div className="col-start-20 col-span-4 flex flex-col">
        <a href="mailto:joyceshidesign@gmail.com">joyceshidesign@gmail.com</a>
        <a href="https://drive.google.com/file/d/1PItNqPCMpBB5bFmDLqDpwux05vBWqp4V/view" target="_blank" rel="noopener noreferrer">
          CV
        </a>
      </div>
      </footer>
    </>
  );
}
