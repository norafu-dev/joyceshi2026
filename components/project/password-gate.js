"use client";

import Link from "next/link";
import { useActionState, useState } from "react";

const INITIAL_STATE = { error: "" };

export default function ProjectPasswordGate({
  buyHref,
  category,
  nextHref,
  nextTitle,
  title,
  unlockAction,
}) {
  const [maskLength, setMaskLength] = useState(0);
  const [state, formAction, pending] = useActionState(
    async (previousState, formData) => {
      const result = await unlockAction(previousState, formData);

      // A successful action redirects and never reaches this line. Only clear
      // the mask when the server explicitly returns a validation failure.
      setMaskLength(0);
      return result;
    },
    INITIAL_STATE,
  );
  const visibleError = maskLength || pending ? "" : state?.error || "";

  return (
    <main className="project-page project-password-page container" id="page-top">
      <header className="project-mobile-title-row project-password-mobile-title desktop:hidden">
        <h1>{title}</h1>
        <PasswordProjectActions
          buyHref={buyHref}
          nextHref={nextHref}
          nextTitle={nextTitle}
        />
      </header>

      <section className="project-password-content">
        <p className="project-password-message">
          <span className="project-password-mobile-line">
            This project is confidential.
          </span>{" "}
          <span className="project-password-mobile-line">
            Enter password to view :-)
          </span>
        </p>

        <form
          action={formAction}
          className="project-password-form"
        >
          <label className="sr-only" htmlFor="project-password">
            Project password
          </label>
          <input
            aria-describedby="project-password-error"
            aria-invalid={Boolean(visibleError)}
            autoComplete="current-password"
            className="project-password-input"
            disabled={pending}
            id="project-password"
            name="password"
            onInput={(event) => setMaskLength(event.currentTarget.value.length)}
            placeholder={visibleError || "enter password here"}
            required
            type="password"
          />
          <span
            aria-hidden="true"
            className={`project-password-mask${
              maskLength ? "" : " project-password-mask-placeholder"
            }`}
          >
            {maskLength
              ? "#".repeat(maskLength)
              : visibleError || "enter password here"}
          </span>
          <button
            aria-label="Submit password"
            className="project-password-submit"
            disabled={pending}
            type="submit"
          >
            <svg
              aria-hidden="true"
              className="project-password-submit-icon"
              viewBox="0 0 18 18"
            >
              <path
                d="M0.5 9H17.5M9.5 0.5L17.5 9L9.5 17.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </button>
          <p
            aria-live="polite"
            className="sr-only"
            id="project-password-error"
          >
            {visibleError}
          </p>
        </form>
      </section>

      <aside className="project-password-sidebar">
        <h1 className="project-password-title">{title}</h1>
        <Link className="project-password-return underline" href={`/${category}`}>
          Return
        </Link>
      </aside>
    </main>
  );
}

function PasswordProjectActions({ buyHref, nextHref, nextTitle }) {
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
