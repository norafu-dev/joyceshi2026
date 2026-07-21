import { notFound } from "next/navigation";
import ProjectGrid from "@/components/project/grid";
import SiteFooter from "@/components/footer";
import { PROJECT_CATEGORIES, PROJECTS_BY_CATEGORY_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export function generateStaticParams() {
  return PROJECT_CATEGORIES.map(({ value }) => ({
    category: value,
  }));
}

export const dynamicParams = false;

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const categoryInfo = PROJECT_CATEGORIES.find((item) => item.value === category);

  if (!categoryInfo) {
    notFound();
  }

  const { data: projects } = await sanityFetch({
    query: PROJECTS_BY_CATEGORY_QUERY,
    params: { category },
  });

  const visibleProjects = (projects || []).filter(
    (project) =>
      project.categoryPageCover?.image?.asset?.url ||
      project.categoryPageCover?.video?.file?.asset?.url,
  );

  return (
    <main className="category-page container" id="page-top">
      <ProjectGrid category={category} projects={visibleProjects} />
      <SiteFooter />
    </main>
  );
}
