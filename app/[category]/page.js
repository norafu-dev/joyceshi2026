import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

  return (
    <main className="container mt-12">
      <header className="col-span-10 mb-8">
        <h1 className="text-purple">{categoryInfo.title}</h1>
      </header>

      <section className="col-span-24 grid grid-cols-3 gap-x-1 gap-y-10">
        {projects?.map((project) => (
          <article key={project._id}>
            <Link href={`/${category}/${project.slug}`}>
              <ProjectCover project={project} />
            </Link>
            <div className="mt-2">
              <h2>
                <Link href={`/${category}/${project.slug}`}>{project.title}</Link>
              </h2>
              {project.year ? <p className="text-gray">{project.year}</p> : null}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function ProjectCover({ project }) {
  const imageUrl = project.categoryPageCover?.image?.asset?.url;
  const videoUrl = project.categoryPageCover?.video?.file?.asset?.url;
  const thumbnailUrl = project.categoryPageCover?.video?.thumbnail?.asset?.url;

  if (videoUrl) {
    return (
      <video
        className="aspect-[4/3] w-full object-cover"
        src={videoUrl}
        poster={thumbnailUrl}
        muted
        playsInline
        loop
      />
    );
  }

  if (imageUrl) {
    return (
      <div className="relative aspect-[4/3] w-full">
        <Image
          className="object-cover"
          src={imageUrl}
          alt={project.title || ""}
          fill
          sizes="33vw"
        />
      </div>
    );
  }

  return <div className="aspect-[4/3] w-full bg-gray" />;
}
