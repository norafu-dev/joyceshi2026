"use client";

import Link from "next/link";
import { useActionState, useState } from "react";

const INITIAL_STATE = { error: "" };

export default function ProjectPasswordGate({ category, title, unlockAction }) {
  const [maskLength, setMaskLength] = useState(0);
  const [state, formAction, pending] = useActionState(
    unlockAction,
    INITIAL_STATE,
  );

  return (
    <main className="project-page project-password-page container" id="page-top">
      <section className="project-password-content">
        <p className="project-password-message">
          This project is confidential. Enter password to view :-)
        </p>

        <form
          action={formAction}
          className="project-password-form"
          onSubmit={() => setMaskLength(0)}
        >
          <label className="sr-only" htmlFor="project-password">
            Project password
          </label>
          <input
            aria-describedby="project-password-error"
            aria-invalid={Boolean(state?.error)}
            autoComplete="current-password"
            autoFocus
            className="project-password-input"
            disabled={pending}
            id="project-password"
            name="password"
            onInput={(event) => setMaskLength(event.currentTarget.value.length)}
            placeholder={state?.error || "enter password here"}
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
              : state?.error || "enter password here"}
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
              viewBox="0 0 11 11"
            >
              <path d="M0.5 5.5H10.5M6 0.5L10.5 5.5L6 10.5" />
            </svg>
          </button>
          <p
            aria-live="polite"
            className="sr-only"
            id="project-password-error"
          >
            {state?.error}
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
