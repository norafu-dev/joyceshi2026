import { notFound } from "next/navigation";
import {
  PROJECT_BY_CATEGORY_AND_SLUG_QUERY,
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
  const { data: project } = await sanityFetch({
    query: PROJECT_BY_CATEGORY_AND_SLUG_QUERY,
    params: { category, slug },
  });

  if (!project) {
    notFound();
  }

  return (
    <main className="container mt-12">
      <header className="col-span-12">
        <h1>{project.title}</h1>
        {project.year ? <p className="text-gray">{project.year}</p> : null}
      </header>

      {project.description ? (
        <p className="col-start-13 col-span-8 mt-8">
          {project.description}
        </p>
      ) : null}
    </main>
  );
}

function getCategoryValue(category) {
  return Array.isArray(category) ? category[0] : category;
}
