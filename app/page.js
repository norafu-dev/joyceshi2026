import LandingPage from "@/components/landing-page";
import { LANDING_PAGE_PROJECTS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export default async function Home() {
  const { data: projects = [] } = await sanityFetch({
    query: LANDING_PAGE_PROJECTS_QUERY,
  });

  return <LandingPage projects={projects} />;
}
