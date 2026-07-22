import { createHmac, timingSafeEqual } from "node:crypto";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import SiteFooter from "@/components/footer";
import NavContactLinks from "@/components/nav/contact-links";
import ProjectDetailGallery from "@/components/project/detail-gallery";
import ProjectPasswordGate from "@/components/project/password-gate";
import {
  PROJECT_BY_CATEGORY_AND_SLUG_QUERY,
  PROJECT_NAVIGATION_BY_CATEGORY_QUERY,
  PROJECT_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export async function generateStaticParams() {
  const { data: projects = [] } = await sanityFetch({
    query: PROJECT_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return projects
    .map((project) => ({
      category: getCategoryValue(project.category),
      slug: project.slug,
    }))
    .filter((project) => project.category && project.slug);
}

export default async function ProjectPage({ params }) {
  const { category, slug } = await params;
  const [{ data: project }, { data: categoryProjects = [] }] = await Promise.all([
    sanityFetch({
      query: PROJECT_BY_CATEGORY_AND_SLUG_QUERY,
      params: { category, slug },
    }),
    sanityFetch({
      query: PROJECT_NAVIGATION_BY_CATEGORY_QUERY,
      params: { category },
    }),
  ]);

  if (!project) {
    notFound();
  }

  const cookieStore = await cookies();

  if (project.passwordProtected) {
    const password = process.env.PROJECT_PASSWORD;
    const cookieName = getAccessCookieName(project._id);
    const cookieValue = cookieStore.get(cookieName)?.value;

    if (!isValidAccessCookie(cookieValue, project._id, password)) {
      async function unlockProject(_previousState, formData) {
        "use server";

        const submittedPassword = String(formData.get("password") || "");
        const serverPassword = process.env.PROJECT_PASSWORD;

        if (!serverPassword || !secretsMatch(submittedPassword, serverPassword)) {
          return { error: "incorrect password" };
        }

        const projectPath = `/${category}/${slug}`;
        const cookieStore = await cookies();

        cookieStore.set(cookieName, createAccessToken(project._id, serverPassword), {
          httpOnly: true,
          maxAge: 60 * 60 * 8,
          path: projectPath,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });

        redirect(projectPath);
      }

      return (
        <ProjectPasswordGate
          category={category}
          title={project.title}
          unlockAction={unlockProject}
        />
      );
    }
  }

  const nextProject = getNextProject(categoryProjects, project._id);

  return (
    <main className="project-page container" id="page-top">
      <div className="project-page-gallery">
        <div aria-hidden="true" className="project-gallery-top" id="project-gallery-top" />
        <ProjectDetailGallery project={project} />
        <SiteFooter
          scrollContainerSelector=".project-page-gallery"
          topHref="#project-gallery-top"
        />
      </div>

      <ProjectSidebar
        category={category}
        nextProject={nextProject}
        project={project}
      />
    </main>
  );
}

function ProjectSidebar({ category, nextProject, project }) {
  const awards = (project.awards || []).filter((item) => item.year || item.award);

  return (
    <aside className="project-sidebar">
      <div className="about-scroll project-sidebar-inner">
        <nav className="project-sidebar-contact-nav" aria-label="Contact links">
          <NavContactLinks layout="sidebar" />
        </nav>

        <div className="project-sidebar-content">
          <h1 className="project-sidebar-title">{project.title}</h1>

          {project.year || project.description ? (
            <div className="project-sidebar-entry project-sidebar-description">
              <p className="text-gray">{project.year}</p>
              <p className="whitespace-pre-line text-gray">{project.description}</p>
            </div>
          ) : null}

          {awards.map((item, index) => (
            <div
              className="project-sidebar-award project-sidebar-entry text-gray"
              key={item._key || `${item.year}-${index}`}
            >
              <p>{item.year}</p>
              <p className="whitespace-pre-line">{item.award}</p>
            </div>
          ))}
        </div>
      </div>

      <nav className="project-sidebar-actions" aria-label="Project navigation">
        {project.buy ? (
          <a
            className="text-purple underline"
            href={project.buy}
            rel="noopener noreferrer"
            target="_blank"
          >
            Buy
          </a>
        ) : (
          <span />
        )}

        {nextProject ? (
          <Link
            aria-label={`Next project: ${nextProject.title || "View project"}`}
            className="underline"
            href={`/${category}/${nextProject.slug}`}
          >
            Next project
          </Link>
        ) : null}
      </nav>
    </aside>
  );
}

function getNextProject(projects, currentProjectId) {
  if (projects.length < 2) {
    return null;
  }

  const currentIndex = projects.findIndex((project) => project._id === currentProjectId);

  if (currentIndex === -1) {
    return projects[0];
  }

  return projects[(currentIndex + 1) % projects.length];
}

function getCategoryValue(category) {
  return Array.isArray(category) ? category[0] : category;
}

function createAccessToken(projectId, password) {
  return createHmac("sha256", password)
    .update(projectId)
    .digest("hex");
}

function getAccessCookieName(projectId) {
  return `project-access-${createHmac("sha256", "joyceshi-project-access")
    .update(projectId)
    .digest("hex")
    .slice(0, 16)}`;
}

function isValidAccessCookie(cookieValue, projectId, password) {
  if (!cookieValue || !password) {
    return false;
  }

  return secretsMatch(cookieValue, createAccessToken(projectId, password));
}

function secretsMatch(value, expectedValue) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expectedValue);

  return (
    valueBuffer.length === expectedBuffer.length &&
    timingSafeEqual(valueBuffer, expectedBuffer)
  );
}
