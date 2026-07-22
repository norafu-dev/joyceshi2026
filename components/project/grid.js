import Link from "next/link";
import { AnimatedImageSequence } from "@/components/animated-image";
import { AnimatedProjectMedia } from "./media";
import ProjectCounter from "./counter";

export default function ProjectGrid({ category, projects = [] }) {
  const rows = chunkProjects(projects);

  return (
    <AnimatedImageSequence>
      <section className="category-project-grid col-span-24" aria-label="Projects">
        {rows.map((row, rowIndex) => (
          <div className="category-project-row" key={row.map((project) => project._id).join("-")}>
            {row.map((project, columnIndex) => (
              <article
                className={columnIndex === 0 ? "col-start-2 col-span-10" : "col-start-14 col-span-10"}
                key={project._id}
              >
                <Link
                  aria-label={project.title || "View project"}
                  className="block"
                  href={`/${category}/${project.slug}`}
                >
                  <AnimatedProjectMedia
                    media={project.categoryPageCover}
                    priority={rowIndex === 0}
                    sequenceIndex={rowIndex * 2 + columnIndex}
                    title={project.title}
                  />
                </Link>
              </article>
            ))}

            {rowIndex === 0 ? <ProjectCounter total={projects.length} /> : null}
          </div>
        ))}
      </section>
    </AnimatedImageSequence>
  );
}

function chunkProjects(projects) {
  const rows = [];

  for (let index = 0; index < projects.length; index += 2) {
    rows.push(projects.slice(index, index + 2));
  }

  return rows;
}
